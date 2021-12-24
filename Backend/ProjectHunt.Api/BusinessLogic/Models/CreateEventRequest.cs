using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class CreateEventRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public IEnumerable<string> Roles { get; set; }

        [Required]
        public IEnumerable<string> KeyTechnologies { get; set; }

        [Required]
        public DateTime CloseTime { get; set; }

        [Required]
        public int MaxProjectPeople { get; set; }
    }
}
