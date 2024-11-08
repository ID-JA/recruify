using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Recruify.Infrastructure.Auth;

public class ConfigureJwtBearerOptions(IOptions<JwtOptions> options) : IConfigureNamedOptions<JwtBearerOptions>
{
    private readonly JwtOptions _options = options.Value;

    public void Configure(JwtBearerOptions options)
    {
        Configure(string.Empty, options);
    }

    public void Configure(string? name, JwtBearerOptions options)
    {
        JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Add("firstName", ClaimTypes.GivenName);
        JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Add("lastName", ClaimTypes.Surname);
        
        if (name != JwtBearerDefaults.AuthenticationScheme)
        {
            return;
        }

        var key = Encoding.ASCII.GetBytes(_options.Key);

        options.RequireHttpsMetadata = false;
        options.SaveToken = true;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidIssuer = _options.Issuer,
            ValidAudience = _options.Audience,
            ClockSkew = TimeSpan.Zero
        };
        options.Events = new JwtBearerEvents
        {
            OnChallenge = context =>
            {
                context.HandleResponse();
                if (!context.Response.HasStarted)
                {
                    throw new UnauthorizedAccessException();
                }

                return Task.CompletedTask;
            },
            OnForbidden = _ => throw new UnauthorizedAccessException(),
            OnMessageReceived = ctx =>
            {
                ctx.Request.Cookies.TryGetValue("access-token", out var accessToken);
                if (!string.IsNullOrEmpty(accessToken))
                    ctx.Token = accessToken;
                return Task.CompletedTask;
            }
        };
    }
}
