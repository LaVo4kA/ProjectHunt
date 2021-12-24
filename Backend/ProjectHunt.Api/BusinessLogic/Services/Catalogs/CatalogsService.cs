using System;
using System.Collections.Generic;
using System.Linq;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;
using ProjectHunt.Api.BusinessLogic.Repositories;
using ProjectHunt.Api.BusinessLogic.Repositories.Catalogs;
using ProjectHunt.Api.Exceptions;

namespace ProjectHunt.Api.BusinessLogic.Services.Catalogs
{
    public class CatalogsService : ICatalogsService
    {
        public ICatalogsRepository CatalogsRepository { get; set; }

        public CatalogsService(ICatalogsRepository catalogsRepository)
        {
            CatalogsRepository = catalogsRepository;
        }

        public IEnumerable<string> GetBaseKeyTechnologies()
        {
            var dbResult = CatalogsRepository.GetBaseKeyTechnologies();

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var technologies = dbResult.Result
                .OrderBy(x => x);
            return technologies;
        }

        public IEnumerable<string> GetBaseRoles()
        {
            var dbResult = CatalogsRepository.GetBaseRoles();

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var roles = dbResult.Result
                .OrderBy(x => x);
            return roles;
        }

        public void CreateNewKeyTechnology(string technology)
        {
            var dbResult = CatalogsRepository.CreateNewKeyTechnology(technology);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Такая ключевая технология уже содержится в списке ролей");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }
        }

        public void CreateNewRole(string role)
        {
            var dbResult = CatalogsRepository.CreateNewRole(role);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Такая роль уже содержится в списке ролей");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }
        }

        public IEnumerable<ServerEvent> GetUserEvents(string userId)
        {
            var dbResult = CatalogsRepository.GetUserEvents(userId);

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            return dbResult.Result;
        }
    }
}
