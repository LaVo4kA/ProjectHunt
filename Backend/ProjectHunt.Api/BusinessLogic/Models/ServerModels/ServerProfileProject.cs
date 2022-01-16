using DapperExtensionsReloaded.Mapper;

namespace ProjectHunt.Api.BusinessLogic.Models.ServerModels
{
    public class ServerProfileProject
    {
        [DatabaseColumn(ColumnName = "Id")]
        public string Id { get; set; }

        [DatabaseColumn(ColumnName = "Name")]
        public string Name { get; set; }

        [DatabaseColumn(ColumnName = "Motivation")]
        public string Motivation { get; set; }

        [DatabaseColumn(ColumnName = "Role")]
        public string Role { get; set; }
    }
}
