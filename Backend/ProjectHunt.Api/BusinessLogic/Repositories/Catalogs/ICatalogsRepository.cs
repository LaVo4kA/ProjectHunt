using System.Collections.Generic;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Catalogs
{
    public interface ICatalogsRepository
    {
        public DbQueryResult<IEnumerable<string>> GetBaseKeyTechnologies();

        public DbQueryResult<IEnumerable<string>> GetEventKeyTechnologies(string eventId);

        public DbQueryResult<IEnumerable<string>> GetBaseRoles();

        public DbQueryResult<IEnumerable<string>> GetBaseSkills();

        public DbQueryResult<IEnumerable<string>> GetEventRoles(string eventId);

        public DbQueryResult<IEnumerable<string>> GetEventSkills(string eventId);

        public DbQueryResult CreateNewKeyTechnology(string technology);

        public DbQueryResult CreateNewRole(string role);

        public DbQueryResult<IEnumerable<ServerEvent>> GetUserEvents(string userId);

        public DbQueryResult<IEnumerable<Event>> GetProjectsByName(string projectName);

        public DbQueryResult<IEnumerable<ServerUserEventInfo>> GetUserEventsInfo(string userId);

        public DbQueryResult<ServerUserEventInfo> GetUserEventInfoById(string eventId);

        public DbQueryResult<ServerEvent> GetEventById(string eventId);

        public DbQueryResult<IEnumerable<string>> GetUserEventSkills(string eventId, string userId);

        public DbQueryResult<IEnumerable<ServerUserCard>> GetEventUserCards(string eventId);

        public DbQueryResult<string> GetUserProject(string userId, string eventId);

        public DbQueryResult<UserInfo> GetUserInfo(string userId);

        public DbQueryResult UpdateUserInfo(UserInfo userInfo);

        public DbQueryResult<IEnumerable<ExcludeProjectNotificationInfo>> GetNotifications(string userId);
    }
}
