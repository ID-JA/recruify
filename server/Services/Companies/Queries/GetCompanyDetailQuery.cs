using AutoMapper;
using FastRecruiter.Api.Data.Context;
using FastRecruiter.Api.Exceptions;
using FastRecruiter.Api.Identity.Users;
using FastRecruiter.Api.Models;
using FastRecruiter.Api.Services.Companies.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FastRecruiter.Api.Services.Companies.Queries;

public record GetCompanyDetailQuery(Guid CompanyId) : IRequest<CompanyDetailDto>;

public class GetCompanyDetailQueryHandler(ApplicationDbContext _dbContext,ICurrentUser _currentUser, IMapper _mapper) : IRequestHandler<GetCompanyDetailQuery, CompanyDetailDto>
{
    public async Task<CompanyDetailDto> Handle(GetCompanyDetailQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUser.GetUserId();

        var company = await _dbContext.Companies
        .Where(c => c.Id == request.CompanyId)
                                     .Include(c=>c.Users)
                                     .FirstOrDefaultAsync(cancellationToken);

        return _mapper.Map<CompanyDetailDto>(company) ?? throw new NotFoundException("Not Found");
    }
}
