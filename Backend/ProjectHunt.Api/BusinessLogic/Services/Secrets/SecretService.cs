using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;
using ProjectHunt.Api.BusinessLogic.Repositories;
using ProjectHunt.Api.BusinessLogic.Repositories.Secrets;
using ProjectHunt.Api.BusinessLogic.Services.Users;
using ProjectHunt.Api.Exceptions;

namespace ProjectHunt.Api.BusinessLogic.Services.Secrets
{
    public class SecretService : ISecretService
    {
        private ISecretsRepository SecretsRepository { get; }
        private IUsersService UsersService { get; }

        public SecretService(ISecretsRepository secretsRepository, IUsersService usersService)
        {
            SecretsRepository = secretsRepository ?? throw new ArgumentNullException(nameof(secretsRepository));
            UsersService = usersService ?? throw new ArgumentNullException(nameof(usersService));
        }

        public AuthorizeResult AuthorizeUser(LoginRequest request)
        {
            var hashedPassword = CryptPassword(request.Password);
            var authorizeResult = SecretsRepository.AuthorizeUser(request.Login);

            if (authorizeResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(authorizeResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис неисправен. Обратитесь в службу поддержки.");
            }

            if (hashedPassword.Equals(authorizeResult.Result.Password))
            {
                return authorizeResult.Result;
            }

            throw ExceptionsFactory.Unauthorized("Неправильный логин или пароль.");
        }

        public Guid CreateUser(RegisterRequest request)
        {
            var hashedPassword = CryptPassword(request.Password);
            var userId = SecretsRepository.CreateUser(request.Email, hashedPassword);

            if (userId.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(userId.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Пользователь с таким логином уже существует.");
            }

            if (userId.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(userId.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            UsersService.CreateUser(userId.Result, request.FirstName, request.SecondName, request.Email);

            return userId.Result;
        }

        private string CryptPassword(string password)
        {
            var hash = KeyDerivation.Pbkdf2(password, Settings.Settings.Salt, KeyDerivationPrf.HMACSHA1, 50, 256 / 8);
            return Convert.ToBase64String(hash);
        }
    }
}
