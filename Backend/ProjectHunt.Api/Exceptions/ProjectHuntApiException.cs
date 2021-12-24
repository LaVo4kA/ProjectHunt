namespace ProjectHunt.Api.Exceptions
{
    public class ProjectHuntApiException : System.Exception
    {
        public int HttpCode { get; set; }
        public string ErrorMessage { get; set; }

        public ProjectHuntApiException(int code, string errorMessage)
        {
            HttpCode = code;
            ErrorMessage = errorMessage;
        }
    }
}
