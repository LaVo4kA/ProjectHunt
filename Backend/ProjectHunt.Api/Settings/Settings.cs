namespace ProjectHunt.Api.Settings
{
    public static class Settings
    {
        public const string DbConnectionString = "Server=VASILII;Database=ProjectHunt;Trusted_Connection=True;";
        public static byte[] Salt = new byte[] {0, 1, 0, 1, 1, 0, 1};
    }
}
