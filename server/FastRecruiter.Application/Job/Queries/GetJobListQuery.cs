using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Models;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job.Queries
{
    public class GetJobListQuery : PaginationFilter, IRequest<PaginationResponse<JobDto>>
    {
    }

    public class GetJobsQueryHandler : IRequestHandler<GetJobListQuery, PaginationResponse<JobDto>>
    {
        private readonly IReadRepository<JobEntity> _jobRepository;
        private ICurrentUser _currentUser;

        public GetJobsQueryHandler(IReadRepository<JobEntity> jobRepository, ICurrentUser currentUser)
        {
            _jobRepository = jobRepository;
            _currentUser = currentUser;
        }

        public async Task<PaginationResponse<JobDto>> Handle(GetJobListQuery request, CancellationToken cancellationToken)
        {

            var spec = new EmployerJobsSpec(request, _currentUser.GetUserId());

            return await _jobRepository.PaginatedListAsync(
                spec,
                request.PageNumber,
                request.PageSize,
                cancellationToken: cancellationToken);
        }
    }
}
