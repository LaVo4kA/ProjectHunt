using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class CreateTeamRequest
    {
        public string Name { get; set; }

        [MaxLength(10)]
        public IEnumerable<CreateTeamRoleRequest> Roles { get; set; }
    }
}
