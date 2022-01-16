using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Services.Events;

namespace ProjectHunt.Api.Controllers
{
    [ApiController]
    [Route("events")]
    [Authorize]
    public class EventsController : ControllerBase
    {
        private IEventsService EventsService { get; }

        public EventsController(IEventsService eventsService)
        {
            EventsService = eventsService;
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateEvent([Required] [FromBody] CreateEventRequest request)
        {
            var eventId = EventsService.CreateEvent(request);
            var userId = this.User.Claims.First().Value;
            EventsService.JoinEventAdmin(eventId, userId);
            return new ObjectResult(eventId) { StatusCode = 201 };
        }

        [HttpPatch]
        [Route("updateUserEventInfo")]
        public IActionResult UpdateUserEventInfo([Required] [FromBody] UpdateUserEventInfoRequest request)
        {
            var userId = this.User.Claims.First().Value;
            EventsService.UpdateUserEventInfo(request, userId);
            return new ObjectResult(new ProjectHuntResponse()) {StatusCode = 200};
        }

        [HttpPost]
        [Route("check")]
        public IActionResult CheckAccessCode([Required] [FromQuery] string accessCode)
        {
            var userId = this.User.Claims.First().Value;
            var eventId = EventsService.CheckAccessCode(accessCode, userId);
            return new ObjectResult(eventId) { StatusCode = 200 };
        }

        [HttpPost]
        [Route("join")]
        public IActionResult JoinEvent(JoinEventRequest request)
        {
            var userId = User.Claims.First().Value;
            EventsService.JoinEvent(request, userId);
            return new ObjectResult(new ProjectHuntResponse()) {StatusCode = 200};
        }
    }
}
