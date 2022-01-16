namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class Project
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Motivation { get; set; }

        public string Goal { get; set; }

        public string KeyTechnology { get; set; }

        public string OwnerId { get; set; }

        public Team Team { get; set; }
    }
}
