using System.Collections.Generic;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class TeamRole
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public string RoleName { get; set; }

        public IEnumerable<string> RoleSkills { get; set; }

        public string UserFirstName { get; set; }

        public string UserSecondName { get; set; }
    }
}
