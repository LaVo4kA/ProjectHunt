using System;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Projects
{
    public class ProjectsRepository : IProjectsRepository
    {
        private string ConnectionString { get; }

        public ProjectsRepository()
        {
            ConnectionString = Settings.Settings.DbConnectionString;
        }

        public DbQueryResult CreateProject(CreateProjectRequest request, string projectId, string ownerId)
        {
            var sql = GetCreateProjectSql(request, projectId, ownerId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                connection.Execute(sql);
                connection.Close();
                return DbQueryResult.Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult.Conflict("Ошибка в скрипте");
            }
        }

        public DbQueryResult<ServerProject> GetProjectById(string projectId)
        {
            var sql = GetGetProjectByIdRequest(projectId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<ServerProject>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var project = connection.QueryFirst<ServerProject>(sql);
                connection.Close();
                return DbQueryResult<ServerProject>.Ok(project);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult<ServerProject>.Conflict("Ошибка в скрипте");
            }
        }

        public DbQueryResult<IEnumerable<ServerProject>> GetProjects(string eventId)
        {
            var sql = GetGetAllProjectsSql(eventId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<ServerProject>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var projects = connection.Query<ServerProject>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<ServerProject>>.Ok(projects);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult<IEnumerable<ServerProject>>.Conflict("Ошибка в скрипте");
            }
        }

        public DbQueryResult<IEnumerable<string>> GetProjectFreeRoleNames(string projectId)
        {
            var sql = GetGetProjectFreeRoleNamesSql(projectId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<string>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var projects = connection.Query<string>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<string>>.Ok(projects);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult<IEnumerable<string>>.Conflict("Ошибка в скрипте");
            }
        }

        public DbQueryResult<IEnumerable<ServerTeamRole>> GetProjectRoles(string projectId)
        {
            var sql = GetGetProjectRoles(projectId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<ServerTeamRole>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var roles = connection.Query<ServerTeamRole>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<ServerTeamRole>>.Ok(roles);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult<IEnumerable<ServerTeamRole>>.Conflict("Ошибка в скрипте");
            }
        }

        public DbQueryResult<IEnumerable<string>> GetProjectRoleSkills(string roleId)
        {
            var sql = GetGetProjectRolesSkillsSql(roleId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<string>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var roles = connection.Query<string>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<string>>.Ok(roles);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult<IEnumerable<string>>.Conflict("Ошибка в скрипте");
            }
        }

        public DbQueryResult JoinInRole(string roleId, string userId)
        {
            var sql = GetJoinInRoleSql(roleId, userId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                connection.Execute(sql);
                connection.Close();
                return DbQueryResult.Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult.Conflict("Ошибка в скрипте");
            }
        }

        public DbQueryResult<IEnumerable<ServerProfileProject>> GetUserProject(string userId)
        {
            var sql = GetGetUserProjectsSql(userId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<ServerProfileProject>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var roles = connection.Query<ServerProfileProject>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<ServerProfileProject>>.Ok(roles);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult<IEnumerable<ServerProfileProject>>.Conflict("Ошибка в скрипте");
            }
        }

        public DbQueryResult DeleteUserFromProject(string userId, string projectId)
        {
            var sql = GetDeleteUserFromProjectSql(userId, projectId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                connection.Execute(sql);
                connection.Close();
                return DbQueryResult.Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult.Conflict("Ошибка в скрипте");
            }
        }

        public DbQueryResult<ExcludeProjectNotificationInfo> GetExcludeProjectNotificationInfo(string ownerId,
            string userId, string projectId)
        {
            var sql = GetExcludeProjectNotificationInfoSql(ownerId, userId, projectId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<ExcludeProjectNotificationInfo>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var info = connection.QueryFirst<ExcludeProjectNotificationInfo>(sql);
                connection.Close();
                return DbQueryResult<ExcludeProjectNotificationInfo>.Ok(info);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult<ExcludeProjectNotificationInfo>.Conflict("Ошибка в скрипте");
            }
        }

        public DbQueryResult CreateExcludeProjectNotification(ExcludeProjectNotificationInfo info)
        {
            var sql = GetCreateExcludeProjectNotificationSql(info);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                connection.Execute(sql);
                connection.Close();
                return DbQueryResult.Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return DbQueryResult.Conflict("Ошибка в скрипте");
            }
        }

        private string GetGetProjectRolesSkillsSql(string roleId)
        {
            return $@"
SELECT SkillName FROM [ProjectHunt].dbo.TeamRolesSkills
WHERE RoleId = '{roleId}'
";
        }

        private string GetGetProjectRoles(string projectId)
        {
            return $@"
SELECT tr.Id, tr.Name, u.FirstName, u.SecondName, tr.UserId FROM [ProjectHunt].dbo.Projects as p
JOIN [ProjectHunt].dbo.TeamRoles as tr
    ON p.TeamId = tr.TeamId
LEFT JOIN [ProjectHunt].dbo.Users as u
    ON u.UserId = tr.UserId
WHERE p.Id = '{projectId}'
";
        }

        private string GetCreateProjectSql(CreateProjectRequest request, string projectId, string ownerId)
        {
            var teamId = Guid.NewGuid().ToString();
            var roles = request.Team.Roles.ToArray();
            roles[0].UserId = ownerId;

            var resultsInsertStrings = new List<string>
            {
                @$"UPDATE [ProjectHunt].dbo.UserEvents SET ProjectId='{projectId}' WHERE EventId = '{request.EventId}' AND UserId = '{ownerId}'"
            };

            foreach (var role in roles)
            {
                var roleId = Guid.NewGuid();
                resultsInsertStrings.Add($@"INSERT [ProjectHunt].dbo.TeamRoles VALUES ('{roleId}', '{teamId}', '{role.RoleName}', '{role.UserId ?? ""}')");
                resultsInsertStrings.AddRange(role.RoleSkills.Select(skill => $@"INSERT [ProjectHunt].dbo.TeamRolesSkills VALUES ('{roleId}', '{skill}')"));
            }

            var insertString = string.Join('\n', resultsInsertStrings);
            
            return $@"
INSERT [ProjectHunt].dbo.Projects VALUES ('{projectId}', '{request.EventId}', '{ownerId}', '{request.Description}', '{request.KeyTechnology}', '{request.Motivation}', '{request.Goal}', '{request.Name}', '{teamId}', '{request.Team.Name}')

{insertString}
";
        }

        private string GetGetProjectByIdRequest(string projectId)
        {
            return $@"
SELECT Id, Name, Description, Motivation, Goal, KeyTechnology, TeamName, OwnerId FROM [ProjectHunt].dbo.Projects
WHERE Id = '{projectId}'
";
        }

        private string GetGetAllProjectsSql(string eventId)
        {
            return $@"
SELECT Id, Name, Description, Motivation, Goal, KeyTechnology FROM [ProjectHunt].dbo.Projects
WHERE EventId = '{eventId}'
";
        }

        private string GetGetProjectFreeRoleNamesSql(string projectId)
        {
            return $@"
SELECT tr.Name FROM [ProjectHunt].dbo.Projects as p
JOIN [ProjectHunt].dbo.TeamRoles as tr
    ON tr.TeamId = p.TeamId
WHERE p.Id = '{projectId}' AND tr.UserId = ''
";
        }

        private string GetJoinInRoleSql(string roleId, string userId)
        {
            return $@"
UPDATE [ProjectHunt].dbo.TeamRoles
SET UserId = '{userId}'
WHERE Id = '{roleId}'
";
        }

        private string GetGetUserProjectsSql(string userId)
        {
            return $@"
SELECT p.Id, p.Name, p.Motivation, tr.Name as Role FROM [ProjectHunt].dbo.TeamRoles as tr
JOIN [ProjectHunt].dbo.Projects as p
    ON tr.TeamId = p.TeamId
WHERE tr.UserId = '{userId}'
";
        }

        private string GetDeleteUserFromProjectSql(string userId, string projectId)
        {
            return $@"
UPDATE tr
SET UserId = ''
FROM [ProjectHunt].dbo.TeamRoles as tr
	JOIN [ProjectHunt].dbo.Projects as p
		ON p.TeamId = tr.TeamId
WHERE p.Id = '{projectId}' AND tr.UserId = '{userId}'
";
        }

        private string GetExcludeProjectNotificationInfoSql(string ownerId, string userId, string projectId)
        {
            return $@"
SELECT tr.UserId, p.OwnerId, u.FirstName as OwnerFirstName, u.SecondName as OwnerSecondName, p.Id as ProjectId, p.Name as ProjectName, tr.Name as Role, p.EventId FROM [ProjectHunt].dbo.Projects as p
JOIN [ProjectHunt].dbo.Users as u
    ON u.UserId = '{ownerId}'
JOIN [ProjectHunt].dbo.TeamRoles as tr
    ON tr.UserId = '{userId}'
WHERE p.Id = '{projectId}'
";
        }

        private string GetCreateExcludeProjectNotificationSql(ExcludeProjectNotificationInfo info)
        {
            return $@"
INSERT [ProjectHunt].dbo.Notifications_ProjectExclude VALUES ('{info.OwnerId}', '{info.UserId}', '{info.EventId}', '{info.Role}')
";
        }
    }
}
