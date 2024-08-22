using AutoMapper;
using FastRecruiter.Api.Identity.Users.Features.UserInfo;
using FastRecruiter.Api.Models;

namespace FastRecruiter.Api.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<User, UserDto>().ReverseMap();
    }
}
