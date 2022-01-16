using System.Collections.Generic;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Projects
{
    public interface IProjectsRepository
    {
        public DbQueryResult CreateProject(CreateProjectRequest request, string projectId, string ownerId);

        public DbQueryResult<ServerProject> GetProjectById(string projectId);

        public DbQueryResult<IEnumerable<ServerProject>> GetProjects(string eventId);

        public DbQueryResult<IEnumerable<string>> GetProjectFreeRoleNames(string projectId);

        public DbQueryResult<IEnumerable<ServerTeamRole>> GetProjectRoles(string projectId);

        public DbQueryResult<IEnumerable<string>> GetProjectRoleSkills(string roleId);

        public DbQueryResult JoinInRole(string roleId, string userId);

        public DbQueryResult<IEnumerable<ServerProfileProject>> GetUserProject(string userId);

        public DbQueryResult DeleteUserFromProject(string userId, string projectId);

        public DbQueryResult<ExcludeProjectNotificationInfo> GetExcludeProjectNotificationInfo(string ownerId,
            string userId, string projectId);

        public DbQueryResult CreateExcludeProjectNotification(ExcludeProjectNotificationInfo info);
    }
}
