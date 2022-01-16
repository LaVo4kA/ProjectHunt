using System;
using ProjectHunt.Api.BusinessLogic.Models;

namespace ProjectHunt.Api.BusinessLogic.Services.Events
{
    public interface IEventsService
    {
        public string CreateEvent(CreateEventRequest request);

        public void UpdateUserEventInfo(UpdateUserEventInfoRequest request, string userId);

        public string CheckAccessCode(string accessCode, string userId);

        public void JoinEventAdmin(string eventId, string userId);

        public void JoinEvent(JoinEventRequest request, string userId);
    }
}
