using System.Collections.Generic;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class CreateTeamRoleRequest
    {
        public string RoleName { get; set; }

        public IEnumerable<string> RoleSkills { get; set; }

        public string UserId { get; set; }
    }
}
