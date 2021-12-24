using DapperExtensionsReloaded.Mapper;

namespace ProjectHunt.Api.BusinessLogic.Models.ServerModels
{
    [DatabaseEntity("Secrets")]
    public class AuthorizeResult
    {
        [DatabaseColumn(ColumnName = "UserId")]
        public string UserId { get; set; }

        [DatabaseColumn(ColumnName = "IsAdmin")]
        public bool IsAdmin { get; set; }

        [DatabaseColumn(ColumnName = "Password")]
        public string Password { get; set; }
    }
}
