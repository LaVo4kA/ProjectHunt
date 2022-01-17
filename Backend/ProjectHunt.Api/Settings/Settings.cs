namespace ProjectHunt.Api.Settings
{
    public static class Settings
    {
        public const string DbConnectionString = "Server=tcp:vasilii.database.windows.net,1433;Initial Catalog=ProjectHunt;Persist Security Info=False;User ID=dfcz;Password=1029384756Zxc;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        public static byte[] Salt = new byte[] {0, 1, 0, 1, 1, 0, 1};
    }
}
