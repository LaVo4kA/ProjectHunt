using System;
using System.Data.SqlClient;
using Dapper;
using ProjectHunt.Api.BusinessLogic.Models;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Users
{
    public class UsersRepository : IUsersRepository
    {
        private string ConnectionString { get; }

        public UsersRepository()
        {
            ConnectionString = Settings.Settings.DbConnectionString;
        }

        public DbQueryResult CreateUser(Guid id, string firstName, string secondName, string email)
        {
            var sql = GetCreateUserSql(id, firstName, secondName, email);
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
                return DbQueryResult.Conflict("Ошибка при создании пользователя");
            }
        }

        private string GetCreateUserSql(Guid id, string firstName, string secondName, string email)
        {
            return @$"
INSERT [ProjectHunt].dbo.Users VALUES ('{firstName}', '{secondName}', '{email}', '{id}', NULL, NULL, NULL, NULL, 'False')
";
        }
    }
}
