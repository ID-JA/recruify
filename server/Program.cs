using FastRecruiter.Api.Auth;
using FastRecruiter.Api.Exceptions;
using FastRecruiter.Api.Extensions;
using FastRecruiter.Api.Helpers;
using FastRecruiter.Api.Jobs;
using FastRecruiter.Api.Services.Companies;
using Quartz;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddExceptionHandler<CustomExceptionHandler>();
builder.Services.AddProblemDetails(options =>
        options.CustomizeProblemDetails = ctx =>
        {
            ctx.ProblemDetails.Extensions.Add("trace-id", ctx.HttpContext.TraceIdentifier);
            ctx.ProblemDetails.Extensions.Add("instance", $"{ctx.HttpContext.Request.Method} {ctx.HttpContext.Request.Path}");
        });
builder.Services.AddMediatR(options =>
{
    options.RegisterServicesFromAssemblies(typeof(Program).Assembly);
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCorsPolicy(builder.Configuration);

builder.Services.ConfigureDatabase(builder.Configuration);
builder.Services.ConfigureIdentity();
builder.Services.ConfigureAuth(builder.Configuration);
builder.Services.ConfigureMailing();
builder.Services.AddAutoMapper(typeof(MappingProfiles));

// Add Quartz services
builder.Services.AddQuartz(q =>
{
    q.UseInMemoryStore();
});

builder.Services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);

builder.Services.AddSingleton<IJobSchedulerService, JobSchedulerService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();

var app = builder.Build();




if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseExceptionHandler();
app.UseCorsPolicy();
app.UseDatabaseSeeder();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseMiddleware<CurrentUserMiddleware>();
app.UseAuthorization();

app.MapControllers();



app.Run();
