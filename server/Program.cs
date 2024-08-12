using FastRecruiter.Api.Auth;
using FastRecruiter.Api.Auth.Jwt;
using FastRecruiter.Api.Data;
using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]));
builder.Services.AddScoped<IDatabaseInitializer, DatabaseInitializer>();


builder.Services.ConfigureIdentity();
builder.Services.ConfigureJwtAuth(builder.Configuration);

var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDatabaseSeeder();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.UseMiddleware<CurrentUserMiddleware>();


app.Run();
