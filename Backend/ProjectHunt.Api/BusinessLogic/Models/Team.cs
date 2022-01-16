using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class Team
    {
        public string Name { get; set; }

        public IEnumerable<TeamRole> Roles { get; set; }
    }
}
