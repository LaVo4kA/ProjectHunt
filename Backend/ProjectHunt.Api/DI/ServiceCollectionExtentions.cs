using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ProjectHunt.Api.BusinessLogic.Repositories.Catalogs;
using ProjectHunt.Api.BusinessLogic.Repositories.Events;
using ProjectHunt.Api.BusinessLogic.Repositories.Projects;
using ProjectHunt.Api.BusinessLogic.Repositories.Secrets;
using ProjectHunt.Api.BusinessLogic.Repositories.Users;
using ProjectHunt.Api.BusinessLogic.Services.Catalogs;
using ProjectHunt.Api.BusinessLogic.Services.Events;
using ProjectHunt.Api.BusinessLogic.Services.Projects;
using ProjectHunt.Api.BusinessLogic.Services.Secrets;
using ProjectHunt.Api.BusinessLogic.Services.Users;

namespace ProjectHunt.Api.DI
{
    public static class ServiceCollectionExtentions
    {
        public static IServiceCollection AddBusinessLogic(this IServiceCollection services)
        {
            services.AddSingletonSafely<ISecretService, SecretService>();
            services.AddSingletonSafely<ISecretsRepository, SecretsRepository>();
            services.AddSingletonSafely<IUsersService, UsersService>();
            services.AddSingletonSafely<IUsersRepository, UsersRepository>();
            services.AddSingletonSafely<IEventsService, EventsService>();
            services.AddSingletonSafely<IEventsRepository, EventsRepository>();
            services.AddSingletonSafely<ICatalogsService, CatalogsService>();
            services.AddSingletonSafely<ICatalogsRepository, CatalogsRepository>();
            services.AddSingleton<IProjectsService, ProjectsService>();
            services.AddSingleton<IProjectsRepository, ProjectsRepository>();
            return services;
        }

        private static void AddSingletonSafely<TService, TImplementation>(this IServiceCollection services)
            where TService : class
            where TImplementation : class, TService
        {
            services.TryAddSingleton<TService, TImplementation>();
        }
    }
}
