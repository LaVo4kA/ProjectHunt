using System;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class Event
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string AccessCode { get; set; }

        public DateTime CloseTime { get; set; }

        public int MaxProjectPeople { get; set; }

        public IEquatable<string> KeyTechnologies { get; set; }

        public IEquatable<string> Roles { get; set; }
    }
}
