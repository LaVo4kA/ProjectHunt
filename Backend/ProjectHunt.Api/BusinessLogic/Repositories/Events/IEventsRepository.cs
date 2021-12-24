using System;
using System.Collections.Generic;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Events
{
    public interface IEventsRepository
    {
        public DbQueryResult<string> CreateEvent(ServerEvent serviceServerEvent);

        public DbQueryResult CreateKeyTechnologiesForEvent(IEnumerable<string> technologies, Guid eventId);

        public DbQueryResult CreateRolesForEvent(IEnumerable<string> roles, Guid eventId);

        public DbQueryResult<string> CheckEvent(string accessCode);

        public DbQueryResult JoinEvent(string eventId, string userId);
    }
}
