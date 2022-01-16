using System.Collections.Generic;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Services.Catalogs
{
    public interface ICatalogsService
    {
        public IEnumerable<string> GetBaseKeyTechnologies();

        public IEnumerable<string> GetEventKeyTechnologies(string eventId);

        public IEnumerable<string> GetBaseRoles();

        public IEnumerable<string> GetBaseSkills();

        public IEnumerable<string> GetEventRoles(string eventId);

        public IEnumerable<string> GetEventSkills(string eventId);

        public void CreateNewKeyTechnology(string technology);

        public void CreateNewRole(string role);

        public IEnumerable<Event> GetNowUserEvents(string userId);

        public IEnumerable<Event> GetOldUserEvents(string userId);

        public IEnumerable<Event> GetProjectsByName(string projectName);

        public IEnumerable<UserEventInfo> GetUserEventsInfo(string userId);

        public string GetEventName(string eventId, string userId);

        public Event GetEventById(string eventId);

        public IEnumerable<UserCard> GetEventUserCards(string eventId, string userId);

        public IEnumerable<UserCard> GetEventUserCardsByRoles(string eventId, string userId, string[] roles);

        public IEnumerable<UserCard> GetEventUserCardsByName(string eventId, string userId, string name);

        public UserInfo GetUserInfo(string userId);

        public UserInfo UpdateUserInfo(UserInfo userInfo);

        public IEnumerable<ExcludeProjectNotificationInfo> GetNotifications(string userId);
    }
}
