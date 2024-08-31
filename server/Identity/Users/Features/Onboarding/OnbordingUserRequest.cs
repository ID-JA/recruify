using System.Collections.ObjectModel;

namespace FastRecruiter.Api.Identity.Users.Features.Onboarding;

public record OnboardingUserRequest(string CompanyName, string Industry, string Size, Collection<string> Invitees);

