using System;

namespace ProjectHunt.Api.BusinessLogic.Services.Users
{
    public interface IUsersService
    {
        public void CreateUser(Guid userId, string firstName, string secondName, string email);
    }
}
