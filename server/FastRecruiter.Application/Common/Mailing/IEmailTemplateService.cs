using FastRecruiter.Application.Common.Interfaces;

namespace FastRecruiter.Application.Common.Mailing
{
    public interface IEmailTemplateService : ITransientService
    {
        string GenerateEmailTemplate<T>(string templateName, T mailTemplateModel);
    }

}
