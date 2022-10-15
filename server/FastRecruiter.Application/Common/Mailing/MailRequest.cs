namespace FastRecruiter.Application.Common.Mailing
{
    public class MailRequest
    {
        public MailRequest(List<string> to,
                           string subject,
                           string? body = null,
                           string? from = null,
                           string? displayName = null,
                           string? replyTo = null,
                           string? replyToName = null)
        {
            To = to;
            Subject = subject;
            Body = body;
            From = from;
            DisplayName = displayName;
            ReplyTo = replyTo;
            ReplyToName = replyToName;
        }

        public List<string> To { get; }

        public string Subject { get; }

        public string? Body { get; }

        public string? From { get; }

        public string? DisplayName { get; }

        public string? ReplyTo { get; }

        public string? ReplyToName { get; }





    }
}
