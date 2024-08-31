using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Identity.Users;
using FastRecruiter.Api.Jobs;
using FastRecruiter.Api.Models;
using FastRecruiter.Api.Services.Companies.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;

namespace FastRecruiter.Api.Services.Companies;

public interface ICompanyService
{
    Task<Guid> RegisterCompanyAsync(RegisterCompanyRequest request, CancellationToken cancellationToken = default);
    Task ProcessCompanyInvitationAsync(string email, string invitationToken, CancellationToken cancellationToken = default);
}

public class CompanyService(ApplicationDbContext _dbContext,
                            IJobSchedulerService _jobScheduler,
                            IUserService _userService,
                            ICurrentUser _currentUser,
                            UserManager<User> _userManager) : ICompanyService
{


    public async Task<Guid> RegisterCompanyAsync(RegisterCompanyRequest request, CancellationToken cancellationToken = default)
    {
        using var transaction = await _dbContext.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            var companyId = await CreateCompanyAsync(request.CompanyName, request.Size, request.Industry, cancellationToken);
            await _userService.AssignUserToCompanyAsync(_currentUser.GetUserId(), companyId, "Owner", cancellationToken);

            if (request.Invitees.Count > 0)
            {
                await CreateAndStoreInvitesAsync(companyId, request.Invitees, cancellationToken);
                await _jobScheduler.SendInvitationEmailsAsync(request.CompanyName, request.Invitees, cancellationToken);
            }

            await transaction.CommitAsync(cancellationToken);

            return companyId;
        }
        catch
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }

    public async Task ProcessCompanyInvitationAsync(string email, string invitationToken, CancellationToken cancellationToken = default)
    {
        var verificationToken = await _dbContext.VerificationTokens
            .SingleOrDefaultAsync(t => t.Token == invitationToken, cancellationToken);

        if (verificationToken == null || verificationToken.ExpireAt < DateTime.UtcNow)
        {
            throw new InvalidOperationException("Invalid or expired invitation token.");
        }

        var companyInvite = await _dbContext.CompanyInvites
            .SingleOrDefaultAsync(i => i.Email == email, cancellationToken);

        if (companyInvite == null || companyInvite.ExpireAt < DateTime.UtcNow)
        {
            throw new InvalidOperationException("No valid invitation found for this email.");
        }

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            user = new User
            {
                UserName = email,
                Email = email,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Failed to create the user.");
            }
        }

        user.CompanyId = companyInvite.CompanyId;
        user.Role = "Member";

        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        _dbContext.CompanyInvites.Remove(companyInvite);
        _dbContext.VerificationTokens.Remove(verificationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task<Guid> CreateCompanyAsync(string name, string size, string industry, CancellationToken cancellationToken)
    {
        var company = new Company { Name = name, Size = size, Industry = industry };
        _dbContext.Companies.Add(company);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return company.Id;
    }

    private async Task CreateAndStoreInvitesAsync(Guid companyId, Collection<string> invitees, CancellationToken cancellationToken)
    {
        var expireAt = DateTime.UtcNow.AddDays(15);
        var invites = invitees.Select(email => new CompanyInvite
        {
            CompanyId = companyId,
            Email = email,
            ExpireAt = expireAt,
            CreatedAt = DateTime.UtcNow,
        }).ToList();

        _dbContext.CompanyInvites.AddRange(invites);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }


}
