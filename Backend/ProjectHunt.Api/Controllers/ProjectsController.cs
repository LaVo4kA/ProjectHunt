using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Services.Projects;

namespace ProjectHunt.Api.Controllers
{
    [ApiController]
    [Route("projects")]
    [Authorize]
    public class ProjectsController : ControllerBase
    {
        private IProjectsService ProjectsService { get; }

        public ProjectsController(IProjectsService projectsService)
        {
            ProjectsService = projectsService;
        }

        [HttpPost]
        [Route("create")]
        public IActionResult CreateProject([Required][FromBody] CreateProjectRequest request)
        {
            var ownerId = this.User.Claims.First().Value;
            var projectId = ProjectsService.CreateProject(request, ownerId);
            return new ObjectResult(projectId) { StatusCode = 201 };
        }

        [HttpGet]
        [Route("getProjectById")]
        public IActionResult GetProjectById([Required][FromQuery] string projectId)
        {
            var project = ProjectsService.GetProjectById(projectId);
            return new ObjectResult(project) { StatusCode = 200 };
        }

        [HttpGet]
        [Route("getAllProjects")]
        public IActionResult GetProjects([Required][FromQuery] string eventId)
        {
            var projects = ProjectsService.GetProjects(eventId);
            return new ObjectResult(projects) { StatusCode = 200 };
        }

        [HttpGet]
        [Route("getUserProjects")]
        public IActionResult GetUserProjects([Required][FromQuery] string userId)
        {
            if (userId == "me")
            {
                userId = User.Claims.First().Value;
            }

            var projects = ProjectsService.GetUserProjects(userId);
            return new ObjectResult(projects) { StatusCode = 200 };
        }

        [HttpPost]
        [Route("joinInRole")]
        public IActionResult JoinInRole([Required][FromQuery] string roleId)
        {
            var userId = User.Claims.First().Value;
            ProjectsService.JoinInRole(roleId, userId);
            return new ObjectResult(new ProjectHuntResponse()) { StatusCode = 200 };
        }

        [HttpDelete]
        [Route("deleteUserFromProject")]
        public IActionResult DeleteUserFromProject([Required][FromQuery] string userId, [Required][FromQuery] string projectId)
        {
            var ownerId = User.Claims.First().Value;
            ProjectsService.CreateProjectExcludeNotification(ownerId, userId, projectId);
            //ProjectsService.DeleteUserFromProject(userId, projectId);
            return new ObjectResult(new ProjectHuntResponse()) { StatusCode = 200 };
        }
    }
}
