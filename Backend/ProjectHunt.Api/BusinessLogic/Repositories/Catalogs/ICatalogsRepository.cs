using System.Collections.Generic;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Repositories.Catalogs
{
    public interface ICatalogsRepository
    {
        public DbQueryResult<IEnumerable<string>> GetBaseKeyTechnologies();

        public DbQueryResult<IEnumerable<string>> GetBaseRoles();

        public DbQueryResult CreateNewKeyTechnology(string technology);

        public DbQueryResult CreateNewRole(string role);

        public DbQueryResult<IEnumerable<ServerEvent>> GetUserEvents(string userId);
    }
}
