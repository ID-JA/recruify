using Recruify.Domain.Enums;

namespace Recruify.Application.Recruiters;

public record RecruiterDto(Guid Id, Guid IdentityId, Guid? CompanyId, Role? Role);