using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Fluid;

namespace FastRecruiter.Api.Mail;

public interface IMailService
{
    Task SendAsync(MailRequest request, CancellationToken cancellationToken = default);
    Task<string> RenderMailTemplateAsync(string tempalteName, object model);
}


public class MailService(IOptions<MailSettings> mailSettings, ILogger<MailService> _logger) : IMailService
{
    private readonly MailSettings _mailSettings = mailSettings.Value;
    private readonly string _templatesPath = Path.Combine(Directory.GetCurrentDirectory(), "Mail/EmailTemplates");

    public async Task SendAsync(MailRequest request, CancellationToken cancellationToken)
    {
        using var email = new MimeMessage();
        email.From.Add(new MailboxAddress(_mailSettings.DisplayName, request.From ?? _mailSettings.From));
        
        foreach(var address in request.To)
            email.To.Add(MailboxAddress.Parse(address));

        var builder = new BodyBuilder();
        email.Sender = new MailboxAddress(request.DisplayName ?? _mailSettings.DisplayName, request.From ?? _mailSettings.From);
        
        email.Subject = request.Subject;
        
        builder.HtmlBody = request.Body;

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

    public async Task<string> RenderMailTemplateAsync(string tempalteName, object model)
    {
        var templatePath = Path.Combine(Directory.GetCurrentDirectory(), $"Mail/EmailTemplates/{tempalteName}.liquid");
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