using System.Collections.Generic;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class ProfileProjectCard
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Motivation { get; set; }

        public string Role { get; set; }

        public IEnumerable<string> FreeRoleNames { get; set; }
    }
}
