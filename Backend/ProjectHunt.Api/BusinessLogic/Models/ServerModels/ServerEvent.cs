using System;
using DapperExtensionsReloaded.Mapper;

namespace ProjectHunt.Api.BusinessLogic.Models.ServerModels
{
    [DatabaseEntity("Events")]
    public class ServerEvent
    {
        [DatabaseColumn(ColumnName = "Id")]
        public string Id { get; set; }

        [DatabaseColumn(ColumnName = "Name")]
        public string Name { get; set; }

        [DatabaseColumn(ColumnName = "AccessCode")]
        public string AccessCode { get; set; }

        [DatabaseColumn(ColumnName = "CloseTime")]
        public DateTime CloseTime { get; set; }

        [DatabaseColumn(ColumnName = "MaxProjectPeople")]
        public int MaxProjectPeople { get; set; }
    }
}
