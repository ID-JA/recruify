namespace Recruify.Application.Common.Mailing;

public interface IMailService
{
    Task SendEmailAsync(MailRequest mailRequest, CancellationToken cancellationToken = default);
}
