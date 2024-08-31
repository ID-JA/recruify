using Quartz;
using System.Collections.ObjectModel;

namespace FastRecruiter.Api.Jobs;

public interface IJobSchedulerService
{
    Task SendInvitationEmailsAsync(string companyName, Collection<string> invitees, CancellationToken cancellationToken = default);

}


public class JobSchedulerService(ISchedulerFactory _schedulerFactory) : IJobSchedulerService
{
    public async Task SendInvitationEmailsAsync(string companyName, Collection<string> invitees, CancellationToken cancellationToken = default)
    {
        var scheduler = await _schedulerFactory.GetScheduler();

        var jobDetail = JobBuilder.Create<SendInvitationEmailJob>()
                             .WithIdentity(SendInvitationEmailJob.Key)
                             .Build();

        var jobDataMap = jobDetail.JobDataMap;
        jobDataMap.Put("companyName", companyName);
        jobDataMap.Put("invitationLink", "invitationLink");
        jobDataMap.Put("invitees", invitees);

        var trigger = TriggerBuilder.Create()
                                    .WithIdentity("send-invitation-email-trigger", "group1")
                                    .StartNow()
                                    .Build();

        await scheduler.ScheduleJob(jobDetail, trigger, cancellationToken);



    }

}