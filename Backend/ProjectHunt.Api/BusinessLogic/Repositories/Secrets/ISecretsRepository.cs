using System;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Secrets
{
    public interface ISecretsRepository
    {
        public DbQueryResult<AuthorizeResult> AuthorizeUser(string login);

        public DbQueryResult<Guid> CreateUser(string login, string hashedPassword);

        public DbQueryResult<Guid> GetUserId(string login);

        public DbQueryResult<bool> IsAdmin(string userId);
    }
}
