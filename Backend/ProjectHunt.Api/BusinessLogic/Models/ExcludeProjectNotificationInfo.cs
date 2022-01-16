namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class ExcludeProjectNotificationInfo
    {
        public string UserId { get; set; }

        public string OwnerId { get; set; }

        public string OwnerFirstName { get; set; }

        public string OwnerSecondName { get; set; }

        public string ProjectId { get; set; }

        public string ProjectName { get; set; }

        public string Role { get; set; }

        public string EventId { get; set; }
    }
}
