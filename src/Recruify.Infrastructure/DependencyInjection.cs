using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Recruify.Infrastructure.Data;
using Recruify.Application.Common.Interfaces;
using Recruify.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Recruify.Domain.Common;
using Ardalis.Specification;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Recruify.Application.Common.Mailing;
using Recruify.Infrastructure.Mailing;
using Recruify.Infrastructure.Auth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Recruify.Domain.Recruiters;
using Recruify.Infrastructure.Mapper;
using Recruify.Infrastructure.Services;

namespace Recruify.Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IServiceCollection services, ConfigurationManager config)
    {
        services.AddDbContext<RecruifyDbContext>(options =>
            options.UseSqlServer(config["ConnectionStrings:DefaultConnection"]));

        services.AddOptions<MailSettings>().BindConfiguration(nameof(MailSettings));
        services.AddOptions<JwtOptions>().BindConfiguration(nameof(JwtOptions));
        
        services.AddCorsPolicy();
        services.AddAutoMapperProfile();

        RegisterAuthIdentity(services, config);
        RegisterServices(services);
    }


    private static void AddAutoMapperProfile(this IServiceCollection services)
    {
        MapperConfiguration mappingConfig = new(mc =>
        {
            mc.AddProfile(new InfrastructureIdentityProfile());
            mc.AddProfile(new InfrastructureRecruiterProfile());
        });
        
        services.AddSingleton(mappingConfig.CreateMapper());

    }
    private static void RegisterAuthIdentity(IServiceCollection services, IConfiguration configuration)
    {

        services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
            .AddEntityFrameworkStores<RecruifyDbContext>()
            .AddDefaultTokenProviders();
        
        services.AddSingleton<IConfigureOptions<JwtBearerOptions>, ConfigureJwtBearerOptions>();

        services
            .AddAuthentication(authentication =>
            {
                authentication.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authentication.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                // authentication.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, null!)
            .AddGoogle(options =>
            {
                options.ClientId = configuration["Authentication:Google:ClientId"]!;
                options.ClientSecret = configuration["Authentication:Google:ClientSecret"]!;
            })
            .AddMicrosoftAccount(options =>
            {
                options.ClientId = configuration["Authentication:Microsoft:ClientId"]!;
                options.ClientSecret = configuration["Authentication:Microsoft:ClientSecret"]!;
            });

        // services.AddAuthorizationBuilder();
        services.AddAuthorization();

    }

    #region Private Methods

        public static void UseInfrastructure(this WebApplication app)
        {
            app.UseHttpsRedirection();
            app.UseCors("CORS_POLICY");
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();
            app.UseMiddleware<CurrentUserMiddleware>();
            app.MapControllers();
        }

        private static void AddCorsPolicy(this IServiceCollection services) =>
            services.AddCors(opt =>
                opt.AddPolicy("CORS_POLICY", policy =>
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .WithOrigins(["http://localhost:3000"])));

        private static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped(typeof(IReadRepositoryBase<>), typeof(EfRepository<>));
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddTransient<IMailService, EmailSerivce>();
            services.AddScoped<IRecruiterService, RecruiterService>();
            services.AddScoped<ICurrentUser, CurrentUser>();
            services.AddScoped(sp => (ICurrentUserInitializer)sp.GetRequiredService<ICurrentUser>());
        }

    #endregion
}