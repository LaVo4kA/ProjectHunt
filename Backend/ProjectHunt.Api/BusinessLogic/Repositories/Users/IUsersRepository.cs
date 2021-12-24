using System;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Users
{
    public interface IUsersRepository
    {
        public DbQueryResult CreateUser(Guid id, string firstName, string secondName, string email);
    }
}
