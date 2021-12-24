using System;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Services.Secrets
{
    public interface ISecretService
    {
        public AuthorizeResult AuthorizeUser(LoginRequest request);
        public Guid CreateUser(RegisterRequest request);
    }
}
