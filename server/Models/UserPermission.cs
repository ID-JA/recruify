﻿namespace FastRecruiter.Api.Models;

public class UserPermission
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Permission { get; set; }
    public bool IsAllowed { get; set; }
    public User User { get; set; }
}