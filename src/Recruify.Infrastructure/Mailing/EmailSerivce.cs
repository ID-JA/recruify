
using MailKit.Security;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using Recruify.Application.Common.Mailing;
using MailKit.Net.Smtp;
using Fluid;

namespace Recruify.Infrastructure.Mailing;

public class EmailSerivce(IOptions<MailSettings> mailSettings, ILogger<EmailSerivce> _logger) : IMailService
{
    private readonly MailSettings _mailSettings = mailSettings.Value;

    public async Task SendEmailAsync(MailRequest mailRequest, CancellationToken cancellationToken = default)
    {
        using var email = new MimeMessage();
        email.From.Add(new MailboxAddress(_mailSettings.DisplayName, mailRequest.From ?? _mailSettings.From));

        foreach (var address in mailRequest.To)
            email.To.Add(MailboxAddress.Parse(address));

        var builder = new BodyBuilder();
        email.Sender = new MailboxAddress(mailRequest.DisplayName ?? _mailSettings.DisplayName, mailRequest.From ?? _mailSettings.From);

        email.Subject = mailRequest.Subject;

        var body = await RenderMailTemplateAsync(mailRequest.TemplateName, mailRequest.Model);
        builder.HtmlBody = body;

        email.Body = builder.ToMessageBody();

        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls, cancellationToken);
            await client.AuthenticateAsync(_mailSettings.UserName, _mailSettings.Password, cancellationToken);
            await client.SendAsync(email, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while sending email: {Message}", ex.Message);
        }
        finally
        {
            await client.DisconnectAsync(true, cancellationToken);
        }
    }

    private async Task<string> RenderMailTemplateAsync(string tempalteName, object model)
    {
        var templatePath = Path.Combine(Directory.GetCurrentDirectory(), $"EmailTemplates/{tempalteName}.liquid");
        var templateContent = await File.ReadAllTextAsync(templatePath);
        var fluidParser = new FluidParser();

        if (fluidParser.TryParse(templateContent, out var template))
        {
            var context = new TemplateContext(model);
            return await template.RenderAsync(context);
        }

        throw new InvalidOperationException("Failed to parse template.");
    }
}