using AutoMapper;
using FastRecruiter.Api.Identity.Users.DTOs;
using FastRecruiter.Api.Identity.Users.Features.UserInfo;
using FastRecruiter.Api.Models;
using FastRecruiter.Api.Services.Companies.DTOs;

namespace FastRecruiter.Api.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<UserPermission, UserPermissionDto>().ReverseMap();

        CreateMap<Company, CompanyDetailDto>().ReverseMap();
        CreateMap<Company, CompanyDetailDto>().ReverseMap();
        CreateMap<Company, CompanyMembersDto>().ReverseMap();
        CreateMap<Company, CompanyInviteesDto>().ReverseMap();
        CreateMap<CompanyInvite, CompanyInviteDto>().ReverseMap();
    }
}
