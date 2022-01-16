using System.Collections.Generic;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class UserCard
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string Role { get; set; }

        public string Description { get; set; }

        public bool IsBusy { get; set; }

        public IEnumerable<string> Skills { get; set; }
    }
}
