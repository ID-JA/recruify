using AutoMapper;
using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Identity.Users.Features.UserInfo;
using FastRecruiter.Api.Services.Companies.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FastRecruiter.Api.Services.Companies.Queries;


public record GetCompanyMembersQuery(Guid CompanyId) : IRequest<CompanyMembersDto?>;

public class GetCompanyMembersQueryHandler(ApplicationDbContext _dbContext, IMapper _mapper) : IRequestHandler<GetCompanyMembersQuery, CompanyMembersDto?>
{
    public async Task<CompanyMembersDto?> Handle(GetCompanyMembersQuery request, CancellationToken cancellationToken)
    {
        var company = await _dbContext.Companies
                                      .Where(c => c.Id == request.CompanyId)
                                      .Include(c => c.Users)
                                      .ThenInclude(c=>c.UserPermissions)
                                      .FirstOrDefaultAsync(cancellationToken);

        return company == null ? null : _mapper.Map<CompanyMembersDto>(company);
    }
}
