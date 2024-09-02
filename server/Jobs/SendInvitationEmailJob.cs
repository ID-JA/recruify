using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Mail;
using FastRecruiter.Api.Models;
using Microsoft.EntityFrameworkCore;
using Quartz;
using System.Collections.ObjectModel;

namespace FastRecruiter.Api.Jobs;

public class SendInvitationEmailJob(ILogger<SendInvitationEmailJob> logger, IMailService mailService, ApplicationDbContext dbContext) : IJob
{
    public static readonly JobKey Key = new("sendEmail-job", "group1");

    public async Task Execute(IJobExecutionContext context)
    {
        var companyName = context.MergedJobDataMap.GetString("companyName");
        var companyId = context.MergedJobDataMap.GetGuid("companyId");
        var invitees = (Collection<string>)context.MergedJobDataMap["invitees"];

        var expireAt = DateTime.UtcNow.AddDays(15);
        var invites = invitees.Select(email => new CompanyInvite
        {
            CompanyId = companyId,
            Email = email,
            ExpireAt = expireAt,
            Token = Guid.NewGuid(),
            CreatedAt = DateTime.UtcNow,
        }).ToList();

        await dbContext.CompanyInvites.AddRangeAsync(invites);
        await dbContext.SaveChangesAsync();

        foreach (var invite in invites)
        {
            var invitationLink = $"http://localhost:3000/invite?token={invite.Token}";
            var emailBody = await mailService.RenderMailTemplateAsync("invite-to-company", new
            {
                companyName,
                invitationLink,
            });

            var mailRequest = new MailRequest([invite.Email], $"You have been invited to join {companyName} on FastRecruiter", emailBody);
            await mailService.SendAsync(mailRequest);
        }

        logger.LogInformation("Sent {Count} invitations for company {CompanyName}", invitees.Count, companyName);
    }
}
