using FastRecruiter.Api.Auth.Policy;
using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Exceptions;
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
    Task AcceptCompanyInvitateAsync(AcceptCompanyInviteRequest request, CancellationToken cancellationToken = default);

    Task<(bool IsValid, string? CompanyName, string? ErrorMessage)> ValidateInviteAsync(Guid token);
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
            var companyId = await CreateCompanyAsync(request.Name, request.Size, request.Industry, cancellationToken);
            await _userService.AssignUserToCompanyAsync(_currentUser.GetUserId(), companyId, "Owner", cancellationToken);

            if (request.Invitees.Count > 0)
            {
                await _jobScheduler.SendInvitationEmailsAsync(request.Name, companyId, request.Invitees, cancellationToken);
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

    public async Task AcceptCompanyInvitateAsync(AcceptCompanyInviteRequest request, CancellationToken cancellationToken = default)
    {
        var companyInvite = await _dbContext.CompanyInvites
            .SingleOrDefaultAsync(i => i.Token == request.Token, cancellationToken)
            ?? throw new NotFoundException("Invalid invite.");

        // Check if the provided email matches the invite email
        if (companyInvite.Email != request.Email)
        {
            throw new ConflictException("Email provided does not match the invite email.");
        }

        // Check if the invite has expired
        if (companyInvite.ExpireAt < DateTime.UtcNow)
        {
            throw new ValidationException("Invite expired.");
        }

        var user = new User
        {
            UserName = request.Email,
            Email = companyInvite.Email,
            EmailConfirmed = true,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Role = "Member",
            CompanyId = companyInvite.CompanyId
        };

        // Create the user
        var result = await _userManager.CreateAsync(user, request.Password);

        // Remove the invite if user creation is successful
        if (result.Succeeded)
        {
            await _userService.AssignUserToCompanyAsync(user.Id, companyInvite.Id, "Member", cancellationToken);
            _dbContext.CompanyInvites.Remove(companyInvite);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
        else
        {
            throw new InvalidOperationException("Failed to create the user.");
        }

        // Save changes to the database
        await _dbContext.SaveChangesAsync(cancellationToken);
    }




    public async Task<(bool IsValid, string? CompanyName, string? ErrorMessage)> ValidateInviteAsync(Guid token)
    {
        var invite = await _dbContext.CompanyInvites
            .Include(i => i.Company)
            .FirstOrDefaultAsync(i => i.Token == token);

        if (invite == null)
        {
            return (false, null, "Invitation not found or invalid.");
        }

        if (invite.ExpireAt < DateTime.UtcNow)
        {
            return (false, null, "This invitation has expired.");
        }

        return (true, invite.Company.Name, null);
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
            Token = Guid.NewGuid(),
            CreatedAt = DateTime.UtcNow,
        }).ToList();

        _dbContext.CompanyInvites.AddRange(invites);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}


public record AcceptCompanyInviteRequest(string FirstName, string LastName, string Email, string Password, Guid Token);