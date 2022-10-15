using FastRecruiter.Application.Common.Interfaces;

namespace FastRecruiter.Application.Common.Mailing
{
    public interface IMailService : ITransientService
    {
        Task SendAsync(MailRequest request, CancellationToken ct);
    }
}
