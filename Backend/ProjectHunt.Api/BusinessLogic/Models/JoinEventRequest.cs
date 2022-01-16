using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class JoinEventRequest
    {
        [Required]
        public string EventId { get; set; }

        public string Description { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public IEnumerable<string> Skills { get; set; }
    }
}
