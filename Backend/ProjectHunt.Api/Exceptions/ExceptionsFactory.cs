namespace ProjectHunt.Api.Exceptions
{
    public class ExceptionsFactory
    {
        public static ProjectHuntApiException InternalServerError(string errorMessage) =>
            new ProjectHuntApiException(500, errorMessage);

        public static ProjectHuntApiException BadRequest(string errorMessage) =>
            new ProjectHuntApiException(400, errorMessage);

        public static ProjectHuntApiException Unauthorized(string errorMessage) =>
            new ProjectHuntApiException(401, errorMessage);

        public static ProjectHuntApiException NotFound(string errorMessage) =>
            new ProjectHuntApiException(404, errorMessage);
    }
}
