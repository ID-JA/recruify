using AutoMapper;
using Recruify.Application.Identity.Dtos;
using Recruify.Application.Recruiters;
using Recruify.Domain.Recruiters;
using Recruify.Infrastructure.Identity;

namespace Recruify.Infrastructure.Mapper;

public class InfrastructureIdentityProfile : Profile
{
    public InfrastructureIdentityProfile()
    {
        CreateMap<ApplicationUser, ApplicationUserDto>()
            .ReverseMap();
    }
}

public class InfrastructureRecruiterProfile : Profile
{
    public InfrastructureRecruiterProfile()
    {
        CreateMap<Recruiter, RecruiterDto>()
            .ReverseMap();
    }
}