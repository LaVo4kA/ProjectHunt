using System;
using System.Collections.Generic;
using System.Linq;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Models.ServerModels;
using ProjectHunt.Api.BusinessLogic.Repositories;
using ProjectHunt.Api.BusinessLogic.Repositories.Catalogs;
using ProjectHunt.Api.Exceptions;

namespace ProjectHunt.Api.BusinessLogic.Services.Catalogs
{
    public class CatalogsService : ICatalogsService
    {
        public ICatalogsRepository CatalogsRepository { get; set; }

        public CatalogsService(ICatalogsRepository catalogsRepository)
        {
            CatalogsRepository = catalogsRepository;
        }

        public IEnumerable<string> GetBaseKeyTechnologies()
        {
            var dbResult = CatalogsRepository.GetBaseKeyTechnologies();

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var technologies = dbResult.Result
                .OrderBy(x => x);
            return technologies;
        }

        public IEnumerable<string> GetEventKeyTechnologies(string eventId)
        {
            var dbResult = CatalogsRepository.GetEventKeyTechnologies(eventId);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Не удалось получить ключевые технологии мероприятия");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var technologies = dbResult.Result
                .OrderBy(x => x);
            return technologies;
        }

        public IEnumerable<string> GetBaseRoles()
        {
            var dbResult = CatalogsRepository.GetBaseRoles();

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var roles = dbResult.Result
                .OrderBy(x => x);
            return roles;
        }

        public IEnumerable<string> GetBaseSkills()
        {
            var dbResult = CatalogsRepository.GetBaseSkills();

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var roles = dbResult.Result
                .OrderBy(x => x);
            return roles;
        }

        public IEnumerable<string> GetEventRoles(string eventId)
        {
            var dbResult = CatalogsRepository.GetEventRoles(eventId);

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var roles = dbResult.Result
                .OrderBy(x => x);
            return roles;
        }

        public IEnumerable<string> GetEventSkills(string eventId)
        {
            var dbResult = CatalogsRepository.GetEventSkills(eventId);

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var skills = dbResult.Result
                .OrderBy(x => x);
            return skills;
        }

        public void CreateNewKeyTechnology(string technology)
        {
            var dbResult = CatalogsRepository.CreateNewKeyTechnology(technology);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Такая ключевая технология уже содержится в списке ролей");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }
        }

        public void CreateNewRole(string role)
        {
            var dbResult = CatalogsRepository.CreateNewRole(role);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Такая роль уже содержится в списке ролей");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }
        }

        public IEnumerable<Event> GetNowUserEvents(string userId)
        {
            var dbResult = CatalogsRepository.GetUserEvents(userId);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Не удалось получить мероприятия юзера");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var serverEvents = dbResult.Result.Where(ev => ev.CloseTime >= DateTime.Now);
            var result = new List<Event>();

            foreach (var serverEvent in serverEvents)
            {
                var keyTechnologies = CatalogsRepository.GetEventKeyTechnologies(serverEvent.Id).Result;
                var roles = CatalogsRepository.GetEventRoles(serverEvent.Id).Result;

                result.Add(new Event()
                {
                    Id = serverEvent.Id,
                    AccessCode = serverEvent.AccessCode,
                    CloseTime = serverEvent.CloseTime.ToLongDateString(),
                    KeyTechnologies = keyTechnologies,
                    MaxProjectPeople = serverEvent.MaxProjectPeople,
                    Name = serverEvent.Name,
                    Roles = roles
                });
            }

            return result;
        }

        public IEnumerable<Event> GetOldUserEvents(string userId)
        {
            var dbResult = CatalogsRepository.GetUserEvents(userId);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Не удалось получить мероприятия юзера");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var serverEvents = dbResult.Result.Where(ev => ev.CloseTime < DateTime.Now);
            var result = new List<Event>();

            foreach (var serverEvent in serverEvents)
            {
                var keyTechnologies = CatalogsRepository.GetEventKeyTechnologies(serverEvent.Id).Result;
                var roles = CatalogsRepository.GetEventRoles(serverEvent.Id).Result;

                result.Add(new Event()
                {
                    Id = serverEvent.Id,
                    AccessCode = serverEvent.AccessCode,
                    CloseTime = serverEvent.CloseTime.ToLongDateString(),
                    KeyTechnologies = keyTechnologies,
                    MaxProjectPeople = serverEvent.MaxProjectPeople,
                    Name = serverEvent.Name,
                    Roles = roles
                });
            }

            return result;
        }

        public IEnumerable<Event> GetProjectsByName(string projectName)
        {
            var dbResult = CatalogsRepository.GetProjectsByName(projectName);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Не удалось получить мероприятия по названию");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            return dbResult.Result;
        }

        public IEnumerable<UserEventInfo> GetUserEventsInfo(string userId)
        {
            var serverInfos = CatalogsRepository.GetUserEventsInfo(userId).Result;

            var result = new List<UserEventInfo>();

            foreach (var info in serverInfos)
            {
                var skills = CatalogsRepository.GetUserEventSkills(info.EventId, userId).Result;
                var baseSkills = CatalogsRepository.GetEventSkills(info.EventId).Result;
                var baseRoles = CatalogsRepository.GetEventRoles(info.EventId).Result;
                result.Add(new UserEventInfo()
                {
                    Description = info.Description,
                    EventId = info.EventId,
                    EventName = info.EventName,
                    Role = info.Role,
                    Skills = skills,
                    BaseRoles = baseRoles,
                    BaseSkills = baseSkills
                });
            }

            return result;
        }

        public string GetEventName(string eventId, string userId)
        {
            var serverInfos = CatalogsRepository.GetUserEventsInfo(userId).Result;
            var ev = serverInfos.First(e => e.EventId == eventId);
            return ev.EventName;
        }

        public Event GetEventById(string eventId)
        {
            var serverEvent = CatalogsRepository.GetEventById(eventId).Result;

            var technologies = CatalogsRepository.GetEventKeyTechnologies(eventId).Result;
            var roles = CatalogsRepository.GetEventRoles(eventId).Result;

            return new Event()
            {
                AccessCode = serverEvent.AccessCode,
                CloseTime = serverEvent.CloseTime.ToLongDateString(),
                Id = serverEvent.Id,
                KeyTechnologies = technologies,
                MaxProjectPeople = serverEvent.MaxProjectPeople,
                Name = serverEvent.Name,
                Roles = roles
            };
        }

        public IEnumerable<UserCard> GetEventUserCards(string eventId, string userId)
        {
            var dbResult = CatalogsRepository.GetEventUserCards(eventId);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Не удалось получить карточки юзеров");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var serverUserCards = dbResult.Result
                .Where(x => x.UserId != userId);

            var userCards = CreateUserCards(serverUserCards, eventId, userId);

            return userCards;
        }

        public IEnumerable<UserCard> GetEventUserCardsByRoles(string eventId, string userId, string[] roles)
        {
            var dbResult = CatalogsRepository.GetEventUserCards(eventId);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Не удалось получить карточки юзеров");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var serverUserCards = dbResult.Result
                .Where(x => x.UserId != userId && roles.Contains(x.Role));

            var userCards = CreateUserCards(serverUserCards, eventId, userId);

            return userCards;
        }

        public IEnumerable<UserCard> GetEventUserCardsByName(string eventId, string userId, string name)
        {
            var dbResult = CatalogsRepository.GetEventUserCards(eventId);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Не удалось получить карточки юзеров");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var serverUserCards = dbResult.Result
                .Where(x => x.UserId != userId)
                .OrderByDescending(x => x.FirstName.Contains(name) || x.SecondName.Contains(name));

            var userCards = CreateUserCards(serverUserCards, eventId, userId);

            return userCards;
        }

        public UserInfo GetUserInfo(string userId)
        {
            var dbResult = CatalogsRepository.GetUserInfo(userId);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Не удалось получить информацию о юзере");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            var userInfo = dbResult.Result;
            userInfo.Id = userId;

            return userInfo;
        }

        private IEnumerable<UserCard> CreateUserCards(IEnumerable<ServerUserCard> serverUserCards, string eventId, string userId)
        {
            var result = new List<UserCard>();

            foreach (var serverUserCard in serverUserCards)
            {
                var skills = CatalogsRepository.GetUserEventSkills(eventId, serverUserCard.UserId).Result;
                var projectId = CatalogsRepository.GetUserProject(serverUserCard.UserId, eventId).Result;
                result.Add(new UserCard()
                {
                    Description = serverUserCard.Description,
                    FirstName = serverUserCard.FirstName,
                    Id = serverUserCard.UserId,
                    Role = serverUserCard.Role,
                    Skills = skills,
                    SecondName = serverUserCard.SecondName,
                    IsBusy = projectId != null
                });
            }

            return result;
        }

        public UserInfo UpdateUserInfo(UserInfo userInfo)
        {
            var dbResult = CatalogsRepository.UpdateUserInfo(userInfo);

            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Не удалось обновить информацию о юзере");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            return userInfo;
        }

        public IEnumerable<ExcludeProjectNotificationInfo> GetNotifications(string userId)
        {
            var dbResult = CatalogsRepository.GetNotifications(userId);
            if (dbResult.Status == DbQueryResultStatus.Conflict)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.BadRequest("Не удалось получить обновления");
            }

            if (dbResult.Status != DbQueryResultStatus.Ok)
            {
                Console.WriteLine(dbResult.ErrorMessage);
                throw ExceptionsFactory.InternalServerError("Сервис не исправен. Обратитесь в службу поддержки.");
            }

            return dbResult.Result;
        }
    }
}
