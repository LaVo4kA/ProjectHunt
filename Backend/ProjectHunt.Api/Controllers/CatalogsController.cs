using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Services.Catalogs;

namespace ProjectHunt.Api.Controllers
{
    [ApiController]
    [Route("catalogs")]
    [Authorize]
    public class CatalogsController : ControllerBase
    {
        private ICatalogsService CatalogsService { get; set; }

        public CatalogsController(ICatalogsService catalogsService)
        {
            CatalogsService = catalogsService;
        }

        [HttpGet]
        [Route("getBaseKeyTechnologies")]
        public IActionResult GetBaseKeyTechnologies()
        {
            var technologies = CatalogsService.GetBaseKeyTechnologies();

            if (!technologies.Any())
            {
                return new ObjectResult(null) { StatusCode = 404 };
            }
            return new ObjectResult(technologies) {StatusCode = 200};
        }

        [HttpGet]
        [Route("getBaseRoles")]
        public IActionResult GetBaseRoles()
        {
            var roles = CatalogsService.GetBaseRoles();

            if (!roles.Any())
            {
                return new ObjectResult(null) { StatusCode = 404 };
            }
            return new ObjectResult(roles) {StatusCode = 200};
        }

        [HttpPost]
        [Route("createKeyTechnology")]
        public IActionResult CreateNewKeyTechnology(string technology)
        {
            CatalogsService.CreateNewKeyTechnology(technology);
            return new ObjectResult(new ProjectHuntResponse()) {StatusCode = 201};
        }

        [HttpPost]
        [Route("createRole")]
        public IActionResult CreateNewRole(string role)
        {
            CatalogsService.CreateNewRole(role);
            return new ObjectResult(new ProjectHuntResponse()) { StatusCode = 201 };
        }

        [HttpGet]
        [Route("getEvents")]
        public IActionResult GetUserEvents()
        {
            var userId = this.User.Claims.First().Value;
            var events = CatalogsService.GetUserEvents(userId);

            if (!events.Any())
            {
                return new ObjectResult(null) { StatusCode = 404 };
            }
            return new ObjectResult(events) {StatusCode = 200};
        }
    }
}
