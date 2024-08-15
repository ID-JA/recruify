using FastRecruiter.Api.Mail;

namespace FastRecruiter.Api.Extensions;

public static class ConfigureMailingExtension
{
    internal static IServiceCollection ConfigureMailing(this IServiceCollection services)
    {
        services.AddTransient<IMailService, MailService>();
        services.AddOptions<MailSettings>().BindConfiguration(nameof(MailSettings));
        return services;
    }
}
