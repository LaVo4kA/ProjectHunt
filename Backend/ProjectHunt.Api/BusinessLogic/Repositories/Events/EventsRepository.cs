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
                return DbQueryResult<string>.Ok(serviceServerEvent.Id.ToString());
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<string>.Conflict("Ошибка при создании мероприятия");
            }
        }

        public DbQueryResult<string> CheckEvent(string accessCode)
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

        public DbQueryResult JoinEvent(string eventId, string userId)
        {
            var sql = GetJoinEventSql(eventId, userId);
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
                return DbQueryResult.Conflict("Ошибка при добавлении события в список событий юзера");
            }
        }

        public DbQueryResult CreateKeyTechnologiesForEvent(IEnumerable<string> technologies, Guid eventId)
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

        public DbQueryResult CreateRolesForEvent(IEnumerable<string> roles, Guid eventId)
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

        private string GetCreateEventRequest(ServerEvent serviceServerEvent)
        {
            return @$"
INSERT [ProjectHunt].dbo.Events VALUES ('{serviceServerEvent.Id}', '{serviceServerEvent.Name}', '{serviceServerEvent.MaxProjectPeople}', '{serviceServerEvent.CloseTime}', '{serviceServerEvent.AccessCode}')
";
        }

        private string GetCreateKeyTechnologiesSql(IEnumerable<string> technologies, Guid eventId)
        {
            var insertStrings = technologies
                .Select(technology => $"INSERT [ProjectHunt].dbo.KeyTechnologiesForEvent VALUES ('{technology}', '{eventId}')");
            return string.Join('\n', insertStrings);
        }

        private string GetCreateRolesSql(IEnumerable<string> roles, Guid eventId)
        {
            var insertStrings = roles
                .Select(role => $"INSERT [ProjectHunt].dbo.RolesForEvent VALUES ('{role}', '{eventId}')");
            return string.Join('\n', insertStrings);
        }

        private string GetCheckEventSql(string accessCode)
        {
            return $@"
SELECT Id FROM [ProjectHunt].dbo.Events
WHERE AccessCode = '{accessCode}'
";
        }

        private string GetJoinEventSql(string eventId, string userId)
        {
            return $@"
INSERT [ProjectHunt].dbo.UserEvents VALUES ('{eventId}', '{userId}')
";
        }
    }
}
