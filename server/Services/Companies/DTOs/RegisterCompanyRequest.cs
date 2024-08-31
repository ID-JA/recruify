using System.Collections.ObjectModel;

namespace FastRecruiter.Api.Services.Companies.DTOs;

public record RegisterCompanyRequest(string CompanyName, string Industry, string Size, Collection<string> Invitees);
