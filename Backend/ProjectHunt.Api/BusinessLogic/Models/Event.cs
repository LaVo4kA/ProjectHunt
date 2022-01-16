using System;
using System.Collections.Generic;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class Event
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string AccessCode { get; set; }

        public string CloseTime { get; set; }

        public int MaxProjectPeople { get; set; }

        public IEnumerable<string> KeyTechnologies { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}
