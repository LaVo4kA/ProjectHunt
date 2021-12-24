using System;
using System.Collections.Generic;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;
using ProjectHunt.Api.BusinessLogic.Repositories;
using ProjectHunt.Api.BusinessLogic.Repositories.Events;
using ProjectHunt.Api.Exceptions;

namespace ProjectHunt.Api.BusinessLogic.Services.Events
{
    public class EventsService : IEventsService
    {
        public IEventsRepository EventsRepository { get; }

        public EventsService(IEventsRepository eventsRepository)
        {
            EventsRepository = eventsRepository;
        }

        public string CreateEvent(CreateEventRequest request)
        {
            var accessCode = Guid.NewGuid().ToString()[..8];
            var eventId = Guid.NewGuid();
            var serviceEvent = new ServerEvent()
            {
                AccessCode = accessCode,
                CloseTime = request.CloseTime,
                Id = eventId,
                MaxProjectPeople = request.MaxProjectPeople,
                Name = request.Name
            };

            var dbResult = EventsRepository.CreateEvent(serviceEvent);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Вы счастливчик! Мы сгенерировали 8ми значный код, но он совпал с уже существующим. Повторите попытку создания.");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            CreateKeyTechnologiesForEvent(request.KeyTechnologies, serviceEvent.Id);
            CreateRolesForEvent(request.Roles, serviceEvent.Id);

            return accessCode;
        }

        public string JoinEvent(string accessCode, string userId)
        {
            var myEvent = EventsRepository.CheckEvent(accessCode);

            if (myEvent.Status == DbQueryResultStatus.Conflict || myEvent.Status == DbQueryResultStatus.Error)
            {
                Console.WriteLine(myEvent.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось войти в мероприятие.");
            }

            if (myEvent.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(myEvent.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            if (myEvent.Result == null)
            {
                throw ExceptionsFactory.NotFound("Мероприятия не найдено");
            }

            EventsRepository.JoinEvent(myEvent.Result, userId);

            return myEvent.Result;
        }

        private void CreateKeyTechnologiesForEvent(IEnumerable<string> technologies, Guid eventId)
        {
            var dbResult = EventsRepository.CreateKeyTechnologiesForEvent(technologies, eventId);

            if (dbResult.Status == DbQueryResultStatus.Conflict || dbResult.Status == DbQueryResultStatus.Error)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось создать ключевые технологии для мероприятия.");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }
        }

        private void CreateRolesForEvent(IEnumerable<string> roles, Guid eventId)
        {
            var dbResult = EventsRepository.CreateRolesForEvent(roles, eventId);

            if (dbResult.Status == DbQueryResultStatus.Conflict || dbResult.Status == DbQueryResultStatus.Error)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось создать роли для мероприятия.");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }
        }
    }
}
