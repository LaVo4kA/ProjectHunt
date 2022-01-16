using System.ComponentModel.DataAnnotations;
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
        [Route("getEventKeyTechnologies")]
        public IActionResult GetEventKeyTechnologies([Required] [FromQuery] string eventId)
        {
            var technologies = CatalogsService.GetEventKeyTechnologies(eventId);
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

        [HttpGet]
        [Route("getBaseSkills")]
        public IActionResult GetBaseSkills()
        {
            var roles = CatalogsService.GetBaseSkills();

            if (!roles.Any())
            {
                return new ObjectResult(null) { StatusCode = 404 };
            }
            return new ObjectResult(roles) { StatusCode = 200 };
        }

        [HttpGet]
        [Route("getEventRoles")]
        public IActionResult GetEventRoles([Required] [FromQuery] string eventId)
        {
            var eventRoles = CatalogsService.GetEventRoles(eventId);
            return new ObjectResult(eventRoles) {StatusCode = 200};
        }

        [HttpGet]
        [Route("getEventSkills")]
        public IActionResult GetEventSkills([Required] [FromQuery] string eventId)
        {
            var eventSkills = CatalogsService.GetEventSkills(eventId);
            return new ObjectResult(eventSkills) { StatusCode = 200 };
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
        [Route("getNowEvents")]
        public IActionResult GetNowUserEvents()
        {
            var userId = this.User.Claims.First().Value;
            var events = CatalogsService.GetNowUserEvents(userId);

            return new ObjectResult(events) {StatusCode = 200};
        }

        [HttpGet]
        [Route("getOldEvents")]
        public IActionResult GetOldUserEvents()
        {
            var userId = this.User.Claims.First().Value;
            var events = CatalogsService.GetOldUserEvents(userId);

            return new ObjectResult(events) { StatusCode = 200 };
        }

        [HttpGet]
        [Route("getProjectByName")]
        public IActionResult GetProjectsByName([Required] [FromQuery] string projectName)
        {
            var projects = CatalogsService.GetProjectsByName(projectName);
            return new ObjectResult(projects) {StatusCode = 200};
        }

        [HttpGet]
        [Route("getUserEventsInfo")]
        public IActionResult GetUserEventInfo([Required] [FromQuery] string userId)
        {
            if (userId == "me")
            {
                userId = User.Claims.First().Value;
            }

            var infos = CatalogsService.GetUserEventsInfo(userId);
            return new ObjectResult(infos) {StatusCode = 200};
        }

        [HttpGet]
        [Route("getEventById")]
        public IActionResult GetEventById([Required][FromQuery] string eventId)
        {
            var ev = CatalogsService.GetEventById(eventId);
            return new ObjectResult(ev) { StatusCode = 200 };
        }

        [HttpGet]
        [Route("getEventName")]
        public IActionResult GetUserEventInfoById([Required][FromQuery] string eventId)
        {
            var userId = User.Claims.First().Value;
            var name = CatalogsService.GetEventName(eventId, userId);
            return new ObjectResult(name) { StatusCode = 200 };
        }

        [HttpGet]
        [Route("getEventUserCards")]
        public IActionResult GetEventUserCards([Required] [FromQuery] string eventId)
        {
            var userId = this.User.Claims.First().Value;
            var userCards = CatalogsService.GetEventUserCards(eventId, userId);
            return new ObjectResult(userCards) {StatusCode = 200};
        }

        [HttpGet]
        [Route("getEventUserCardsByRoles")]
        public IActionResult GetEventUserCardsByRoles([Required] [FromQuery] string eventId, [Required] [FromQuery] string[] roles)
        {
            var userId = this.User.Claims.First().Value;
            var userCards = CatalogsService.GetEventUserCardsByRoles(eventId, userId, roles);
            return new ObjectResult(userCards) { StatusCode = 200 };
        }

        [HttpGet]
        [Route("getEventUserCardsByName")]
        public IActionResult GetEventUserCardsByName([Required] [FromQuery] string eventId, [Required] [FromQuery] string name)
        {
            var userId = this.User.Claims.First().Value;
            var userCards = CatalogsService.GetEventUserCardsByName(eventId, userId, name);
            return new ObjectResult(userCards) { StatusCode = 200 };
        }

        [HttpGet]
        [Route("getUserInfo")]
        public IActionResult GetUserInfo([Required] [FromQuery] string userId)
        {
            if (userId == "me")
            {
                userId = User.Claims.First().Value;
            }

            var userInfo = CatalogsService.GetUserInfo(userId);
            return new ObjectResult(userInfo) { StatusCode = 200 };
        }

        [HttpPut]
        [Route("updateUserInfo")]
        public IActionResult UpdateUserInfo([Required] [FromBody] UserInfo userInfo)
        {
            CatalogsService.UpdateUserInfo(userInfo);
            return new ObjectResult(new ProjectHuntResponse()) {StatusCode = 200};
        }

        [HttpGet]
        [Route("getNotifications")]
        public IActionResult GetNotifications()
        {
            var userId = User.Claims.First().Value;
            var notifications = CatalogsService.GetNotifications(userId);
            return new ObjectResult(notifications) {StatusCode = 200};
        }
    }
}
