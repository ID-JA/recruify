using MediatR;

namespace FastRecruiter.Application.Common.Abstractions.Messaging
{
    public interface ICommand<out TResponse> : IRequest<TResponse>
    {
    }
}
