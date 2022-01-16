using DapperExtensionsReloaded.Mapper;

namespace ProjectHunt.Api.BusinessLogic.Models.ServerModels
{
    public class ServerUserCard
    {
        [DatabaseColumn(ColumnName = "UserId")]
        public string UserId { get; set; }

        [DatabaseColumn(ColumnName = "FirstName")]
        public string FirstName { get; set; }

        [DatabaseColumn(ColumnName = "SecondName")]
        public string SecondName { get; set; }

        [DatabaseColumn(ColumnName = "Role")]
        public string Role { get; set; }

        [DatabaseColumn(ColumnName = "Description")]
        public string Description { get; set; }
    }
}
