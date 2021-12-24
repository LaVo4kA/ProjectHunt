using System;
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
        public IActionResult CreateEvent([Required(ErrorMessage = "Тело запроса не должно быть пустым")] [FromBody] CreateEventRequest request)
        {
            var accessCode = EventsService.CreateEvent(request);
            var userId = this.User.Claims.First().Value;
            var eventId = EventsService.JoinEvent(accessCode, userId);
            return new ObjectResult(eventId) { StatusCode = 201 };
        }

        [HttpPost]
        [Route("join")]
        public IActionResult JoinEvent([Required] [FromBody] string accessCode)
        {
            var userId = this.User.Claims.First().Value;
            var eventId = EventsService.JoinEvent(accessCode, userId);
            return new ObjectResult(eventId) { StatusCode = 200 };
        }

        //[HttpDelete]
        //[Authorize(Roles = "Admin")]
        //[Route("delete/{eventId}")]
        //public IActionResult DeleteEvent(Guid eventId)
        //{
        //    // todo
        //    return new ObjectResult(new ProjectHuntResponse()) { StatusCode = 200 };
        //}
    }
}
