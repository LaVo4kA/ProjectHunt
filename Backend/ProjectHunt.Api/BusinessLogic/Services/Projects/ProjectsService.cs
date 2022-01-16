using System;
using System.Collections.Generic;
using System.Linq;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Repositories;
using ProjectHunt.Api.BusinessLogic.Repositories.Projects;
using ProjectHunt.Api.Exceptions;

namespace ProjectHunt.Api.BusinessLogic.Services.Projects
{
    public class ProjectsService : IProjectsService
    {
        private IProjectsRepository ProjectsRepository { get; }

        public ProjectsService(IProjectsRepository projectsRepository)
        {
            ProjectsRepository = projectsRepository;
        }

        public string CreateProject(CreateProjectRequest request, string ownerId)
        {
            var projectId = Guid.NewGuid().ToString();
            var dbResult = ProjectsRepository.CreateProject(request, projectId, ownerId);

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось создать проект");
            }

            return projectId;
        }

        public Project GetProjectById(string projectId)
        {
            var dbResult = ProjectsRepository.GetProjectById(projectId);

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось получить проект");
            }

            var serverProject = dbResult.Result;
            var serverRoles = ProjectsRepository.GetProjectRoles(projectId).Result;
            serverRoles = serverRoles
                .OrderByDescending(role => role.Id == serverProject.OwnerId)
                .ThenBy(role => role.FirstName == null);
            var roles = new List<TeamRole>();
            foreach (var role in serverRoles)
            {
                var skills = ProjectsRepository.GetProjectRoleSkills(role.Id).Result;
                roles.Add(new TeamRole()
                {
                    Id = role.Id,
                    UserId = role.UserId,
                    RoleName = role.Name,
                    UserFirstName = role.FirstName,
                    UserSecondName = role.SecondName,
                    RoleSkills = skills
                });
            }

            var project = new Project()
            {
                OwnerId = serverProject.OwnerId,
                Description = serverProject.Description,
                Goal = serverProject.Goal,
                Id = serverProject.Id,
                KeyTechnology = serverProject.KeyTechnology,
                Motivation = serverProject.Motivation,
                Name = serverProject.Name,
                Team = new Team()
                {
                    Name = serverProject.TeamName,
                    Roles = roles
                }
            };

            return project;
        }

        public IEnumerable<ProjectCard> GetProjects(string eventId)
        {
            var dbResult = ProjectsRepository.GetProjects(eventId);

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось получить проекты мероприятия");
            }

            var serverProjects = dbResult.Result;
            var result = new List<ProjectCard>();
            
            foreach (var project in serverProjects)
            {
                var roleNames = ProjectsRepository.GetProjectFreeRoleNames(project.Id).Result;
                result.Add(new ProjectCard()
                {
                    Id = project.Id,
                    Motivation = project.Motivation,
                    FreeRoleNames = roleNames,
                    KeyTechnology = project.KeyTechnology,
                    Name = project.Name
                });
            }

            return result;
        }

        public void JoinInRole(string roleId, string userId)
        {
            var dbResult = ProjectsRepository.JoinInRole(roleId, userId);

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось вступить в роль");
            }
        }

        public IEnumerable<ProfileProjectCard> GetUserProjects(string userId)
        {
            var dbResult = ProjectsRepository.GetUserProject(userId);

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось получить проекты пользователя");
            }

            var serverProfileProjects = dbResult.Result;
            var result = new List<ProfileProjectCard>();

            foreach (var project in serverProfileProjects)
            {
                var roleNames = ProjectsRepository.GetProjectFreeRoleNames(project.Id).Result;
                result.Add(new ProfileProjectCard()
                {
                    Id = project.Id,
                    Motivation = project.Motivation,
                    FreeRoleNames = roleNames,
                    Role = project.Role,
                    Name = project.Name
                });
            }

            return result;
        }

        public void DeleteUserFromProject(string userId, string projectId)
        {
            var dbResult = ProjectsRepository.DeleteUserFromProject(userId, projectId);

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось получить проекты пользователя");
            }
        }

        public void CreateProjectExcludeNotification(string ownerId, string userId, string projectId)
        {
            var info = ProjectsRepository.GetExcludeProjectNotificationInfo(ownerId, userId, projectId).Result;
            ProjectsRepository.CreateExcludeProjectNotification(info);
        }
    }
}
