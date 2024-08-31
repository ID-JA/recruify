using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Mail;
using FastRecruiter.Api.Models;
using Microsoft.EntityFrameworkCore;
using Quartz;
using System.Collections.ObjectModel;
using System.Threading;

namespace FastRecruiter.Api.Jobs;

public class SendInvitationEmailJob(ILogger<SendInvitationEmailJob> _logger, IMailService _mailService, ApplicationDbContext _dbContext) : IJob
{
    public static readonly JobKey Key = new("sendEmail-job", "group1");

    public async Task Execute(IJobExecutionContext context)
    {
        var companyName = context.MergedJobDataMap.GetString("companyName");
        var invitees = (Collection<string>)context.MergedJobDataMap["invitees"];

        foreach(var email in invitees)
        {
            var verificationToken = new VerificationToken
            {
                Id = email,
                Token = Guid.NewGuid().ToString(),
                ExpireAt = DateTime.UtcNow.AddDays(15),
                Used = false
            };

            _dbContext.VerificationTokens.Add(verificationToken);
            await _dbContext.SaveChangesAsync();


            var invitationLink = $"http://localhost:5171/api/company/invite?email={email}&token={verificationToken}";

            var emailBody = await _mailService.RenderMailTemplateAsync("invite-to-company", new
            {
                companyName,
                invitationLink,
            });

            var mailRequest = new MailRequest(invitees, $"You have been invited to join {companyName} on FastRecruiter", emailBody);

            await _mailService.SendAsync(mailRequest);
        }


        
       

           

    }
}
