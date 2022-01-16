using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Catalogs
{
    public class CatalogsRepository : ICatalogsRepository
    {
        private string ConnectionString { get; set; }

        public CatalogsRepository()
        {
            ConnectionString = Settings.Settings.DbConnectionString;
        }

        public DbQueryResult<IEnumerable<string>> GetBaseKeyTechnologies()
        {
            var sql = GetGetBaseKeyTechnologiesSql();
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<string>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var technologies = connection.Query<string>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<string>>.Ok(technologies);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<string>>.Error("Ошибка при получении списка ключевых технологий");
            }
        }

        public DbQueryResult<IEnumerable<string>> GetEventKeyTechnologies(string eventId)
        {
            var sql = GetGetEventKeyTechnologies(eventId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<string>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var eventTechnologies = connection.Query<string>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<string>>.Ok(eventTechnologies);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<string>>.Error("Ошибка при получении списка ключевых технологий мероприятия");
            }
        }

        public DbQueryResult<IEnumerable<string>> GetBaseRoles()
        {
            var sql = GetGetBaseRolesSql();
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
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<string>>.Error("Ошибка при получении списка ролей");
            }
        }

        public DbQueryResult<IEnumerable<string>> GetBaseSkills()
        {
            var sql = GetGetBaseSkillsSql();
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<string>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var skills = connection.Query<string>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<string>>.Ok(skills);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<string>>.Error("Ошибка при получении списка навыков");
            }
        }

        public DbQueryResult<IEnumerable<string>> GetEventRoles(string eventId)
        {
            var sql = GetGetEventRoles(eventId);
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
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<string>>.Error("Ошибка при получении списка ролей мероприятия");
            }
        }

        public DbQueryResult<IEnumerable<string>> GetEventSkills(string eventId)
        {
            var sql = GetGetEventSkills(eventId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<string>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var skills = connection.Query<string>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<string>>.Ok(skills);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<string>>.Error("Ошибка при получении списка скилов мероприятия");
            }
        }

        public DbQueryResult CreateNewKeyTechnology(string technology)
        {
            var sql = GetCreateNewKeyTechnologySql(technology);
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
                Console.WriteLine(e.Message);
                return DbQueryResult.Error("Ошибка при создании новой ключевой технологии");
            }
        }

        public DbQueryResult CreateNewRole(string role)
        {
            var sql = GetCreateNewRoleSql(role);
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
                Console.WriteLine(e.Message);
                return DbQueryResult.Error("Ошибка при создании новой роли");
            }
        }

        public DbQueryResult<IEnumerable<ServerEvent>> GetUserEvents(string userId)
        {
            var sql = GetGetUserEventsSql(userId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<ServerEvent>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var userEvents = connection.Query<ServerEvent>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<ServerEvent>>.Ok(userEvents);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<ServerEvent>>.Error("Ошибка при получении мероприятий пользователя");
            }
        }

        public DbQueryResult<IEnumerable<Event>> GetProjectsByName(string projectName)
        {
            throw new NotImplementedException();
        }

        public DbQueryResult<IEnumerable<ServerUserEventInfo>> GetUserEventsInfo(string userId)
        {
            var sql = GetGetUserEventsInfoSql(userId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<ServerUserEventInfo>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var serverInfos = connection.Query<ServerUserEventInfo>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<ServerUserEventInfo>>.Ok(serverInfos);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<ServerUserEventInfo>>.Error("Ошибка при получении роли юзера в мероприятии");
            }
        }

        public DbQueryResult<ServerUserEventInfo> GetUserEventInfoById(string eventId)
        {
            var sql = GetGetUserEventInfoByIdSql(eventId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<ServerUserEventInfo>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var serverInfos = connection.QueryFirst<ServerUserEventInfo>(sql);
                connection.Close();
                return DbQueryResult<ServerUserEventInfo>.Ok(serverInfos);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<ServerUserEventInfo>.Error("Ошибка при получении роли юзера в мероприятии");
            }
        }

        public DbQueryResult<ServerEvent> GetEventById(string eventId)
        {
            var sql = GetGetEventByIdSql(eventId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<ServerEvent>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var serverEvent = connection.QueryFirst<ServerEvent>(sql);
                connection.Close();
                return DbQueryResult<ServerEvent>.Ok(serverEvent);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<ServerEvent>.Error("Ошибка при получении роли юзера в мероприятии");
            }
        }

        public DbQueryResult<IEnumerable<string>> GetUserEventSkills(string eventId, string userId)
        {
            var sql = GetGetUserEventSkillsSql(eventId, userId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<string>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var skills = connection.Query<string>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<string>>.Ok(skills);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<string>>.Error("Ошибка при получении роли юзера в мероприятии");
            }
        }

        public DbQueryResult<IEnumerable<ServerUserCard>> GetEventUserCards(string eventId)
        {
            var sql = GetGetEventUserCards(eventId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<ServerUserCard>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var userCards = connection.Query<ServerUserCard>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<ServerUserCard>>.Ok(userCards);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<ServerUserCard>>.Error("Ошибка при получении карточки юзера в мероприятии");
            }
        }

        public DbQueryResult<string> GetUserProject(string userId, string eventId)
        {
            var sql = GetGetUserProjectSql(userId, eventId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<string>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var projectId = connection.ExecuteScalar<string>(sql);
                connection.Close();
                return DbQueryResult<string>.Ok(projectId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<string>.Error("Ошибка при получении проекта юзера");
            }
        }

        public DbQueryResult<UserInfo> GetUserInfo(string userId)
        {
            var sql = GetGetUserInfoSql(userId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<UserInfo>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var projectId = connection.QueryFirst<UserInfo>(sql);
                connection.Close();
                return DbQueryResult<UserInfo>.Ok(projectId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<UserInfo>.Error("Ошибка при получении информации о юзере");
            }
        }

        public DbQueryResult UpdateUserInfo(UserInfo userInfo)
        {
            var sql = GetUpdateUserInfoSql(userInfo);
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
                Console.WriteLine(e.Message);
                return DbQueryResult.Error("Ошибка при получении информации о юзере");
            }
        }

        public DbQueryResult<IEnumerable<ExcludeProjectNotificationInfo>> GetNotifications(string userId)
        {
            var sql = GetGetNotificationsSql(userId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<IEnumerable<ExcludeProjectNotificationInfo>>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var notifications = connection.Query<ExcludeProjectNotificationInfo>(sql);
                connection.Close();
                return DbQueryResult<IEnumerable<ExcludeProjectNotificationInfo>>.Ok(notifications);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<IEnumerable<ExcludeProjectNotificationInfo>>.Error("Ошибка при получении информации о юзере");
            }
        }

        private string GetGetBaseKeyTechnologiesSql()
        {
            return @"
SELECT Name FROM [ProjectHunt].dbo.BaseKeyTechnologies
";
        }

        private string GetGetEventKeyTechnologies(string eventId)
        {
            return $@"
SELECT TechnologyName FROM [ProjectHunt].dbo.KeyTechnologiesForEvent
WHERE EventId = '{eventId}'
";
        }

        private string GetGetBaseRolesSql()
        {
            return @"
SELECT Name FROM [ProjectHunt].dbo.BaseRoles
";
        }

        private string GetGetBaseSkillsSql()
        {
            return @"
SELECT Name FROM [ProjectHunt].dbo.BaseSkills
";
        }

        private string GetGetEventRoles(string eventId)
        {
            return $@"
SELECT RoleName FROM [ProjectHunt].dbo.RolesForEvent
WHERE EventId = '{eventId}'
";
        }

        private string GetGetEventSkills(string eventId)
        {
            return $@"
SELECT Name FROM [ProjectHunt].dbo.SkillsForEvent
WHERE EventId = '{eventId}'
";
        }

        private string GetCreateNewKeyTechnologySql(string technology)
        {
            return $@"
INSERT [ProjectHunt].dbo.BaseKeyTechnologies VALUES ('{technology}')
";
        }

        private string GetCreateNewRoleSql(string role)
        {
            return $@"
INSERT [ProjectHunt].dbo.BaseRoles VALUES ('{role}')
";
        }

        private string GetGetUserEventsSql(string userId)
        {
            return $@"
SELECT e.Id, e.Name, e.MaxProjectPeople, e.CloseTime, e.AccessCode FROM [ProjectHunt].dbo.UserEvents as ue
JOIN [ProjectHunt].dbo.Events as e
    ON ue.EventId = e.Id
WHERE ue.UserId = '{userId}'
";
        }

        private string GetGetEventByIdSql(string eventId)
        {
            return $@"
SELECT Id, Name, AccessCode, CloseTime, MaxProjectPeople FROM [ProjectHunt].dbo.Events
WHERE Id = '{eventId}'
";
        }

        private string GetGetUserEventInfoByIdSql(string eventId)
        {
            throw new NotImplementedException();
        }

        private string GetGetUserEventSkillsSql(string eventId, string userId)
        {
            return $@"
SELECT Skill FROM [ProjectHunt].dbo.UserEventsSkills
WHERE EventId = '{eventId}' AND UserId = '{userId}'
";
        }

        private string GetGetEventUserCards(string eventId)
        {
            return $@"
SELECT ue.UserId, u.FirstName, u.SecondName, ue.Role, ue.Description FROM [ProjectHunt].dbo.UserEvents as ue
JOIN [ProjectHunt].dbo.Users as u
    ON ue.UserId = u.UserId
WHERE ue.EventId = '{eventId}'
";
        }

        private string GetGetUserProjectSql(string userId, string eventId)
        {
            return $@"
SELECT ProjectId FROM [ProjectHunt].dbo.UserEvents
WHERE EventId = '{eventId}' AND UserId = '{userId}'
";
        }

        private string GetGetUserInfoSql(string userId)
        {
            return $@"
SELECT FirstName, SecondName, Email, Vk, Telegram, Comment, EducationGroup, ShowEmail FROM [ProjectHunt].dbo.Users
WHERE UserId = '{userId}'
";
        }

        private string GetGetUserEventsInfoSql(string userId)
        {
            return $@"
SELECT ue.Description, ue.EventId, e.Name as EventName, ue.Role FROM [ProjectHunt].dbo.UserEvents as ue
JOIN [ProjectHunt].dbo.Events as e
    ON e.Id = ue.EventId
WHERE ue.UserId = '{userId}'
";
        }

        private string GetUpdateUserInfoSql(UserInfo userInfo)
        {
            return $@"
UPDATE [ProjectHunt].dbo.Users
SET FirstName = '{userInfo.FirstName}',
    SecondName = '{userInfo.SecondName}',
    Vk = '{userInfo.Vk}',
    Telegram = '{userInfo.Telegram}',
    Comment = '{userInfo.Comment}',
    EducationGroup = '{userInfo.EducationGroup}',
    ShowEmail = '{userInfo.ShowEmail}'
WHERE UserId = '{userInfo.Id}'
";
        }

        private string GetGetNotificationsSql(string userId)
        {
            return $@"
SELECT npe.UserId, npe.OwnerId, u.FirstName as OwnerFirstName, u.SecondName as OwnerSecondName, p.Id as ProjectId, p.Name as ProjectName, npe.Role, p.EventId FROM [ProjectHunt].dbo.Notifications_ProjectExclude as npe
JOIN [ProjectHunt].dbo.Projects as p
    ON p.OwnerId = npe.OwnerId
JOIN [ProjectHunt].dbo.Users as u
    ON u.UserId = npe.OwnerId
WHERE npe.UserId = '{userId}'
";
        }
    }
}
