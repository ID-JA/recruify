using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace FastRecruiter.Application
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();
            return services
                .AddValidatorsFromAssembly(assembly)
                .AddMediatR(assembly);
        }
    }
}
