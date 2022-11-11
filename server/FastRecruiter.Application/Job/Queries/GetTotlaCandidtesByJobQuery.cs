using FastRecruiter.Application.Common.Interfaces;
using FastRecruiter.Application.Common.Persistence;
using FastRecruiter.Application.Specifications;
using FastRecruiter.Domain.Entities;
using MediatR;
using JobEntity = FastRecruiter.Domain.Entities.Job;

namespace FastRecruiter.Application.Job.Queries
{


    public class GetTotlaCandidtesByJobQuery : IRequest<int>
    {
        public string JobId { get; set; } = default!;

        public GetTotlaCandidtesByJobQuery(string jobId)
        {
            JobId = jobId;
        }
    }

    public class GetTotlaCandidtesByJobHandler : IRequestHandler<GetTotlaCandidtesByJobQuery, int>
    {
        private readonly IReadRepository<Applicant> _jobRepository;
        private readonly ICurrentUser _currentUser;

        public GetTotlaCandidtesByJobHandler(IReadRepository<Applicant> jobRepository, ICurrentUser currentUser)
        {
            _jobRepository = jobRepository;
            _currentUser = currentUser;
        }

        public async Task<int> Handle(GetTotlaCandidtesByJobQuery request, CancellationToken cancellationToken)
        {
            var offerSpec = new CandidatesByJobSpec(request.JobId, _currentUser.GetUserId());
            var offer = await _jobRepository.CountAsync(offerSpec);
            return offer;
        }
    }
}