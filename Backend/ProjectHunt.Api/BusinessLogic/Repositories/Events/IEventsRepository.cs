using System;
using System.Collections.Generic;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Events
{
    public interface IEventsRepository
    {
        public DbQueryResult<string> CreateEvent(ServerEvent serviceServerEvent);

        public DbQueryResult UpdateUserEventInfo(UpdateUserEventInfoRequest request, string userId);

        public DbQueryResult CreateKeyTechnologiesForEvent(IEnumerable<string> technologies, string eventId);

        public DbQueryResult CreateRolesForEvent(IEnumerable<string> roles, string eventId);

        public DbQueryResult CreateSkillsForEvent(IEnumerable<string> skills, string eventId);

        public DbQueryResult<string> CheckAccess(string accessCode);

        public DbQueryResult<bool> IsInEvent(string eventId, string userId);

        public DbQueryResult JoinEvent(JoinEventRequest request, string userId);

        public DbQueryResult JoinEventAdmin(string eventId, string userId);
    }
}
