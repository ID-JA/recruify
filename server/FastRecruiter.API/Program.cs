using FastRecruiter.API.Models;
using FastRecruiter.OpenApi;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var CS = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.

// => DataBase
builder.Services.AddDbContext<ApplicationDbContext>(option => option.UseSqlServer(CS, opt => opt.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

// => Versioning
builder.Services.AddOpenApiDocumentation(configuration);

builder.Services.AddApiVersioning(config =>
{
    config.DefaultApiVersion = new ApiVersion(1, 0);
    config.AssumeDefaultVersionWhenUnspecified = true;
    config.ReportApiVersions = true;
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseOpenApiDocumentation(configuration);
app.MapControllers().RequireAuthorization();

app.Run();
