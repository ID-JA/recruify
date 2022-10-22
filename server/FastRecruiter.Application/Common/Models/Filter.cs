namespace FastRecruiter.Application.Common.Models
{
    public static class FilterOperator
    {
        public const string EQ = "eq";
    }

    public class Filter
    {
        public string? Field { get; set; }

        public string? Operator { get; set; }

        public object? Value { get; set; }

    }
}
