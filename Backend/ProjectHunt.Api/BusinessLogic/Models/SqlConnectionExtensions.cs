using System.Data.SqlClient;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public static class SqlConnectionExtensions
    {
        public static bool TryConnect(this SqlConnection connection)
        {
            try
            {
                connection.Open();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
