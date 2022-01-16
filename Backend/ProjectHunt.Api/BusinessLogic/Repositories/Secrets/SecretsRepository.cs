using System;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Secrets
{
    public class SecretsRepository : ISecretsRepository
    {
        private string ConnectionString { get; }

        public SecretsRepository()
        {
            ConnectionString = Settings.Settings.DbConnectionString;
        }

        public DbQueryResult<AuthorizeResult> AuthorizeUser(string login)
        {
            var sql = GetAuthorizeSql(login);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<AuthorizeResult>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var result = connection
                    .Query<AuthorizeResult>(sql)
                    .First();
                connection.Close();
                return DbQueryResult<AuthorizeResult>.Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<AuthorizeResult>.Conflict("Ошибка при получении пароля пользователя");
            }
        }

        public DbQueryResult<Guid> CreateUser(string login, string hashedPassword)
        {
            var userId = Guid.NewGuid();
            var sql = GetCreateUserSql(login, hashedPassword, userId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<Guid>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                connection.ExecuteScalar<Guid>(sql);
                connection.Close();
                return DbQueryResult<Guid>.Ok(userId);
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<Guid>.Conflict("Ошибка при создании пользователя");
            }
        }

        public DbQueryResult<Guid> GetUserId(string login)
        {
            var sql = GetGetUserIdSql(login);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<Guid>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var dbUserId = connection.ExecuteScalar<string>(sql);
                var userId = Guid.Parse(dbUserId);
                connection.Close();
                return DbQueryResult<Guid>.Ok(userId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<Guid>.Conflict("Ошибка при получении пароля пользователя");
            }
        }

        public DbQueryResult<bool> IsAdmin(string userId)
        {
            var sql = GetIsAdminSql(userId);
            var connection = new SqlConnection(ConnectionString);

            if (!connection.TryConnect())
            {
                return DbQueryResult<bool>.Error("Отсутствует подключение к серверу с БД");
            }

            try
            {
                var isAdmin = connection.ExecuteScalar<bool>(sql);
                connection.Close();
                return DbQueryResult<bool>.Ok(isAdmin);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return DbQueryResult<bool>.Conflict("Ошибка");
            }
        }

        private string GetCreateUserSql(string login, string hashedPassword, Guid userId)
        {
            return $@"
INSERT [ProjectHunt].dbo.Secrets VALUES ('{login}', '{hashedPassword}', '{userId}', 0)
";
        }

        private string GetGetUserIdSql(string login)
        {
            return $@"
SELECT UserId FROM [ProjectHunt].dbo.Secrets as s
WHERE s.Login = '{login}'
";
        }

        private string GetAuthorizeSql(string login)
        {
            return $@"
SELECT s.UserId, s.IsAdmin, s.Password, u.FirstName, u.SecondName FROM [ProjectHunt].dbo.Secrets as s
JOIN [ProjectHunt].dbo.Users as u
    ON u.UserId = s.UserId
WHERE s.Login = '{login}'
";
        }

        private string GetIsAdminSql(string userId)
        {
            return $@"
SELECT isAdmin FROM [ProjectHunt].dbo.Secrets
WHERE UserId = '{userId}'
";
        }
    }
}
