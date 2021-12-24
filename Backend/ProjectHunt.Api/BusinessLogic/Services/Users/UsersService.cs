using System;
using ProjectHunt.Api.BusinessLogic.Repositories;
using ProjectHunt.Api.BusinessLogic.Repositories.Users;
using ProjectHunt.Api.Exceptions;

namespace ProjectHunt.Api.BusinessLogic.Services.Users
{
    public class UsersService : IUsersService
    {
        public IUsersRepository UsersRepository { get; }

        public UsersService(IUsersRepository usersRepository)
        {
            UsersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
        }

        public void CreateUser(Guid userId, string firstName, string secondName, string email)
        {
            var result = UsersRepository.CreateUser(userId, firstName, secondName, email);

            if (result.Status == DbQueryResultStatus.Conflict)
            {
                throw ExceptionsFactory.BadRequest("Пользователь с таким ID уже существует.");
            }

            if (result.Status != DbQueryResultStatus.Ok)
            {
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }
        }
    }
}
