using System.Collections.ObjectModel;

namespace Recruify.Application.Common.Mailing;

public class MailRequest(Collection<string> to,
                     string subject,
                     string templateName,
                     object model,
                     string? from = null,
                     string? displayName = null,
                     string? replyTo = null,
                     string? replyToName = null,
                     Collection<string>? bcc = null,
                     Collection<string>? cc = null,
                     IDictionary<string, byte[]>? attachmentData = null,
                     IDictionary<string, string>? headers = null)
{
    public Collection<string> To { get; } = to;

    public string Subject { get; } = subject;

    public string TemplateName { get; } = templateName;
    public object Model { get; } = model;

    public string? From { get; } = from;

    public string? DisplayName { get; } = displayName;

    public string? ReplyTo { get; } = replyTo;

    public string? ReplyToName { get; } = replyToName;

    public Collection<string> Bcc { get; } = bcc ?? [];

    public Collection<string> Cc { get; } = cc ?? [];

    public IDictionary<string, byte[]> AttachmentData { get; } = attachmentData ?? new Dictionary<string, byte[]>();

    public IDictionary<string, string> Headers { get; } = headers ?? new Dictionary<string, string>();
}
