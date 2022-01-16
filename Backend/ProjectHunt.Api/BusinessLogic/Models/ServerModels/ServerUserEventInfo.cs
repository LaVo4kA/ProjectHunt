using DapperExtensionsReloaded.Mapper;

namespace ProjectHunt.Api.BusinessLogic.Models.ServerModels
{
    public class ServerUserEventInfo
    {
        [DatabaseColumn(ColumnName = "Description")]
        public string Description { get; set; }

        [DatabaseColumn(ColumnName = "EventId")]
        public string EventId { get; set; }

        [DatabaseColumn(ColumnName = "EventName")]
        public string EventName { get; set; }

        [DatabaseColumn(ColumnName = "Role")]
        public string Role { get; set; }
    }
}
