using System.ComponentModel.DataAnnotations;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class CreateProjectRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string EventId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Motivation { get; set; }

        [Required]
        public string Goal { get; set; }

        [Required]
        public string KeyTechnology { get; set; }

        [Required]
        public CreateTeamRequest Team { get; set; }
    }
}
