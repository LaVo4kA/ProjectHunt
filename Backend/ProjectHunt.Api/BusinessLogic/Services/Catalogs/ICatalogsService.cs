using System.Collections.Generic;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;

namespace ProjectHunt.Api.BusinessLogic.Services.Catalogs
{
    public interface ICatalogsService
    {
        public IEnumerable<string> GetBaseKeyTechnologies();

        public IEnumerable<string> GetBaseRoles();

        public void CreateNewKeyTechnology(string technology);

        public void CreateNewRole(string role);

        public IEnumerable<ServerEvent> GetUserEvents(string userId);
    }
}
