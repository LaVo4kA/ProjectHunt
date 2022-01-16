using DapperExtensionsReloaded.Mapper;

namespace ProjectHunt.Api.BusinessLogic.Models.ServerModels
{
    [DatabaseEntity("[ProjectHunt].dbo.Projects")]
    public class ServerProject
    {
        [DatabaseColumn(ColumnName = "Id")]
        public string Id { get; set; }

        [DatabaseColumn(ColumnName = "Name")]
        public string Name { get; set; }

        [DatabaseColumn(ColumnName = "Description")]
        public string Description { get; set; }

        [DatabaseColumn(ColumnName = "Motivation")]
        public string Motivation { get; set; }

        [DatabaseColumn(ColumnName = "Goal")]
        public string Goal { get; set; }

        [DatabaseColumn(ColumnName = "KeyTechnology")]
        public string KeyTechnology { get; set; }

        [DatabaseColumn(ColumnName = "TeamName")]
        public string TeamName { get; set; }

        [DatabaseColumn(ColumnName = "OwnerId")]
        public string OwnerId { get; set; }
    }
}
