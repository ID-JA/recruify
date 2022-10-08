using FastRecruiter.Application;
using FastRecruiter.Infrasructure;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
builder.Services.AddInfrasructure(configuration);
builder.Services.AddApplication();


var app = builder.Build();

app.UseInfrastructure(builder.Configuration);
app.MapEndpoints();
app.Run();
