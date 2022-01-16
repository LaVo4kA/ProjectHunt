using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Events
{
    public class EventsRepository : IEventsRepository
    {
        public string ConnectionString { get; }

        public EventsRepository()
        {
            ConnectionString = Settings.Settings.DbConnectionString;
        }

        public DbQueryResult<string> CreateEvent(ServerEvent serviceServerEvent)
        {
            var sql = GetCreateEventRequest(serviceServerEvent);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<string>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                connection.Execute(sql);
                connection.Close();
                return DbQueryResult<string>.Ok(serviceServerEvent.Id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<string>.Conflict("Ошибка при создании мероприятия");
            }
        }

        public DbQueryResult UpdateUserEventInfo(UpdateUserEventInfoRequest request, string userId)
        {
            var sql = GetUpdateUserInfoSql(request, userId);
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
                return DbQueryResult.Conflict("Ошибка при обновлении мероприятия");
            }
        }

        public DbQueryResult<string> CheckAccess(string accessCode)
        {
            var sql = GetCheckEventSql(accessCode);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<string>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var eventId = connection.ExecuteScalar<string>(sql);
                connection.Close();
                return DbQueryResult<string>.Ok(eventId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<string>.Conflict("Ошибка при входе в мероприятие");
            }
        }

        public DbQueryResult<bool> IsInEvent(string eventId, string userId)
        {
            var sql = GetIsInEventSql(eventId, userId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<bool>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var eventIdFromBd = connection.ExecuteScalar<string>(sql);
                connection.Close();

                return DbQueryResult<bool>.Ok(eventIdFromBd != null);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<bool>.Conflict("Ошибка при вступлении в мероприятие");
            }
        }

        public DbQueryResult JoinEvent(JoinEventRequest request, string userId)
        {
            var sql = GetJoinEventSql(request, userId);
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
                return DbQueryResult.Conflict("Ошибка при вступлении в мероприятие");
            }
        }

        public DbQueryResult JoinEventAdmin(string eventId, string userId)
        {
            var sql = GetJoinEventAdminSql(eventId, userId);
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
                return DbQueryResult.Conflict("Ошибка при вступлении админа в мероприятие");
            }
        }

        public DbQueryResult CreateKeyTechnologiesForEvent(IEnumerable<string> technologies, string eventId)
        {
            var sql = GetCreateKeyTechnologiesSql(technologies, eventId);
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
                return DbQueryResult.Conflict("Ошибка при добавлении ключевых технологий в мероприятие");
            }
        }

        public DbQueryResult CreateRolesForEvent(IEnumerable<string> roles, string eventId)
        {
            var sql = GetCreateRolesSql(roles, eventId);
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
                return DbQueryResult.Conflict("Ошибка при добавлении ролей в мероприятие");
            }
        }

        public DbQueryResult CreateSkillsForEvent(IEnumerable<string> skills, string eventId)
        {
            var sql = GetCreateSkillsSql(skills, eventId);
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
                return DbQueryResult.Conflict("Ошибка при добавлении скиллов в мероприятие");
            }
        }

        private string GetCreateEventRequest(ServerEvent serviceServerEvent)
        {
            return @$"
INSERT [ProjectHunt].dbo.Events VALUES ('{serviceServerEvent.Id}', '{serviceServerEvent.Name}', '{serviceServerEvent.MaxProjectPeople}', '{serviceServerEvent.CloseTime}', '{serviceServerEvent.AccessCode}')
";
        }

        private string GetCreateKeyTechnologiesSql(IEnumerable<string> technologies, string eventId)
        {
            var insertStrings = technologies
                .Select(technology => $"INSERT [ProjectHunt].dbo.KeyTechnologiesForEvent VALUES ('{technology}', '{eventId}')");
            return string.Join('\n', insertStrings);
        }

        private string GetCreateRolesSql(IEnumerable<string> roles, string eventId)
        {
            var insertStrings = roles
                .Select(role => $"INSERT [ProjectHunt].dbo.RolesForEvent VALUES ('{role}', '{eventId}')");
            return string.Join('\n', insertStrings);
        }

        private string GetCreateSkillsSql(IEnumerable<string> skills, string eventId)
        {
            var insertStrings = skills
                .Select(skill => $"INSERT [ProjectHunt].dbo.SkillsForEvent VALUES ('{skill}', '{eventId}')");
            return string.Join('\n', insertStrings);
        }

        private string GetCheckEventSql(string accessCode)
        {
            return $@"
SELECT Id FROM [ProjectHunt].dbo.Events
WHERE AccessCode = '{accessCode}'
";
        }

        private string GetUpdateUserInfoSql(UpdateUserEventInfoRequest request, string userId)
        {
            var insert = request.Skills.Select(skill =>
                $"INSERT [ProjectHunt].dbo.UserEventsSkills VALUES ('{userId}', '{request.EventId}', '{skill}')");
            var insertStrings = string.Join('\n', insert);

            return $@"
UPDATE [ProjectHunt].dbo.UserEvents
SET Description = '{request.Description}',
    Role = '{request.Role}'
WHERE EventId = '{request.EventId}' AND UserId = '{userId}'

DELETE FROM [ProjectHunt].dbo.UserEventsSkills
WHERE EventId = '{request.EventId}' AND UserId = '{userId}'

{insertStrings}
";
        }

        private string GetIsInEventSql(string eventId, string userId)
        {
            return $@"
SELECT EventId FROM [ProjectHunt].dbo.UserEvents
WHERE UserId = '{userId}' AND EventId = '{eventId}'
";
        }

        private string GetJoinEventSql(JoinEventRequest request, string userId)
        {
            var insertTegs = request.Skills.Select(tag =>
                $"INSERT [ProjectHunt].dbo.UserEventsSkills VALUES ('{userId}', '{request.EventId}', '{tag}')");
            var str = string.Join('\n', insertTegs);

            return $@"
INSERT [ProjectHunt].dbo.UserEvents VALUES ('{request.EventId}', '{userId}', '{request.Description}', '{request.Role}', NULL)

{str}
";
        }

        private string GetJoinEventAdminSql(string eventId, string userId)
        {
            return $@"
INSERT [ProjectHunt].dbo.UserEvents VALUES ('{eventId}', '{userId}', '', 'Администратор', NULL)

INSERT [ProjectHunt].dbo.UserEventsSkills VALUES ('{userId}', '{eventId}', 'Создаю')
INSERT [ProjectHunt].dbo.UserEventsSkills VALUES ('{userId}', '{eventId}', 'вам')
INSERT [ProjectHunt].dbo.UserEventsSkills VALUES ('{userId}', '{eventId}', 'мероприятия :-)')
";
        }
    }
}
