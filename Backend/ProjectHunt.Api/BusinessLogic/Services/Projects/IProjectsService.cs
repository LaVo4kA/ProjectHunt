using System.Collections.Generic;
using ProjectHunt.Api.BusinessLogic.Models;

namespace ProjectHunt.Api.BusinessLogic.Services.Projects
{
    public interface IProjectsService
    {
        public string CreateProject(CreateProjectRequest request, string ownerId);

        public Project GetProjectById(string projectId);

        public IEnumerable<ProjectCard> GetProjects(string eventId);

        public void JoinInRole(string roleId, string userId);

        public IEnumerable<ProfileProjectCard> GetUserProjects(string userId);

        public void DeleteUserFromProject(string userId, string projectId);

        public void CreateProjectExcludeNotification(string ownerId, string userId, string projectId);
    }
}
