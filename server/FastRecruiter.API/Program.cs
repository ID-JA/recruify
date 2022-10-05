using FastRecruiter.API.Extensions;
using FastRecruiter.API.Models.Entities;
using FastRecruiter.OpenApi;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var CS = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.


builder.Services.AddVersioning(configuration);
builder.Services.AddAppIdentity();
builder.Services.AddMediatR(Assembly.GetExecutingAssembly());
builder.Services.AddOpenApiDocumentation(configuration);
builder.Services.AddDbContext<ApplicationDbContext>(option => option.UseSqlServer(CS, opt => opt.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
builder.Services.AddServices();
builder.Services.AddApplication();


builder.Services.AddControllers().AddFluentValidation();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseOpenApiDocumentation(configuration);
app.MapControllers().RequireAuthorization();

app.Run();
