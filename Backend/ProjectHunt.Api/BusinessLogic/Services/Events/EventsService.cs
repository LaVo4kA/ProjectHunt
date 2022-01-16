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
            var eventId = Guid.NewGuid().ToString();
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
            CreateSkillsForEvent(request.Skills, serviceEvent.Id);

            return eventId;
        }

        public void UpdateUserEventInfo(UpdateUserEventInfoRequest request, string userId)
        {
            var dbResult = EventsRepository.UpdateUserEventInfo(request, userId);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось обновить информацию о мероприятии");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }
        }

        public string CheckAccessCode(string accessCode, string userId)
        {
            var eventId = EventsRepository.CheckAccess(accessCode);

            if (eventId.Status == DbQueryResultStatus.Conflict || eventId.Status == DbQueryResultStatus.Error)
            {
                Console.WriteLine(eventId.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось войти в мероприятие.");
            }

            if (eventId.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(eventId.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            if (eventId.Result == null)
            {
                throw ExceptionsFactory.NotFound("Мероприятие не найдено");
            }

            IsInEvent(eventId.Result, userId);

            return eventId.Result;
        }

        public void JoinEventAdmin(string eventId, string userId)
        {
            var dbResult = EventsRepository.JoinEventAdmin(eventId, userId);

            if (dbResult.Status == DbQueryResultStatus.Conflict || dbResult.Status == DbQueryResultStatus.Error)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось создать админа для мероприятия.");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }
        }

        public void JoinEvent(JoinEventRequest request, string userId)
        {
            IsInEvent(request.EventId, userId);
            var dbResult = EventsRepository.JoinEvent(request, userId);

            if (dbResult.Status == DbQueryResultStatus.Conflict || dbResult.Status == DbQueryResultStatus.Error)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не удалось вступить в мероприятие.");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }
        }

        private void CreateKeyTechnologiesForEvent(IEnumerable<string> technologies, string eventId)
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

        private void CreateRolesForEvent(IEnumerable<string> roles, string eventId)
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

        private void IsInEvent(string eventId, string userId)
        {
            var isInEvent = EventsRepository.IsInEvent(eventId, userId);

            if (isInEvent.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(isInEvent.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Не пройти проверку.");
            }

            if (isInEvent.Result)
            {
                throw ExceptionsFactory.BadRequest("Пользователь уже состоит в этом мероприятии");
            }
        }

        private void CreateSkillsForEvent(IEnumerable<string> skills, string eventId)
        {
            var dbResult = EventsRepository.CreateSkillsForEvent(skills, eventId);

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
