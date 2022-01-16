using System.Collections.Generic;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class UpdateUserEventInfoRequest
    {
        public string EventId { get; set; }

        public string Role { get; set; }

        public IEnumerable<string> Skills { get; set; }

        public string Description { get; set; }
    }
}
