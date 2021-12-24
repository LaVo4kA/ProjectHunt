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
            throw new NotImplementedException();
            //var sql = GetGetUserEventsSql(userId);
            //var connection = new SqlConnection(ConnectionString);

            //if (!connection.TryConnect())
            //{
            //    return DbQueryResult.Error("Отсутствует подключение к серверу с БД");
            //}

            //try
            //{
            //    connection.Execute(sql);
            //    connection.Close();
            //    return DbQueryResult.Ok();
            //}
            //catch (Exception e)
            //{
            //    Console.WriteLine(e.Message);
            //    return DbQueryResult.Error("Ошибка при создании новой роли");
            //}
        }

        private string GetGetBaseKeyTechnologiesSql()
        {
            return @"
SELECT Name FROM [ProjectHunt].dbo.BaseKeyTechnologies
";
        }

        private string GetGetBaseRolesSql()
        {
            return @"
SELECT Name FROM [ProjectHunt].dbo.BaseRoles
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
WHERE e.ID = {userId}
";
        }
    }
}
