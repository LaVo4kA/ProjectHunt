using DapperExtensionsReloaded.Mapper;

namespace ProjectHunt.Api.BusinessLogic.Models.ServerModels
{
    [DatabaseEntity("Projects")]
    public class ServerTeamRole
    {
        [DatabaseColumn(ColumnName = "Id")]
        public string Id { get; set; }

        [DatabaseColumn(ColumnName = "Name")]
        public string Name { get; set; }

        [DatabaseColumn(ColumnName = "FirstName")]
        public string FirstName { get; set; }

        [DatabaseColumn(ColumnName = "SecondName")]
        public string SecondName { get; set; }

        [DatabaseColumn(ColumnName = "UserId")]
        public string UserId { get; set; }
    }
}
