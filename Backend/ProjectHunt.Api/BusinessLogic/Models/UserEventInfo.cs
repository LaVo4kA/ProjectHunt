using System.Collections.Generic;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class UserEventInfo
    {
        public string EventId { get; set; }

        public string EventName { get; set; }

        public string Role { get; set; }

        public IEnumerable<string> BaseRoles { get; set; }

        public IEnumerable<string> Skills { get; set; }

        public IEnumerable<string>  BaseSkills { get; set; }

        public string Description { get; set; }
    }
}
