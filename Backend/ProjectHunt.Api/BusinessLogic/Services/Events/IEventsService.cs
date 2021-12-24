using System;
using ProjectHunt.Api.BusinessLogic.Models;

namespace ProjectHunt.Api.BusinessLogic.Services.Events
{
    public interface IEventsService
    {
        public string CreateEvent(CreateEventRequest request);

        public string JoinEvent(string accessCode, string userId);

        public string JoinEventAdmin(string userId);
    }
}
