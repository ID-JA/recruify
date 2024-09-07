using AutoMapper;
using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Services.Companies.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto;

namespace FastRecruiter.Api.Services.Companies.Queries;

public record GetCompanyInviteesQuery(Guid CompanyId) : IRequest<CompanyInviteesDto>;

public class GetCompanyInviteesQueryHandler(ApplicationDbContext _dbContext, IMapper _mapper) : IRequestHandler<GetCompanyInviteesQuery, CompanyInviteesDto>
{
    public async Task<CompanyInviteesDto> Handle(GetCompanyInviteesQuery request, CancellationToken cancellationToken)
    {
        var result = await _dbContext.Companies.Where(c => c.Id == request.CompanyId)
                                               .Include(c => c.CompanyInvites)
                                               .FirstOrDefaultAsync(cancellationToken);

        return _mapper.Map<CompanyInviteesDto>(result);
    }
}
