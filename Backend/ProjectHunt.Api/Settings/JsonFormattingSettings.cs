using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ProjectHunt.Api.Controllers.BaseController
{
    public class JsonFormattingSettings
    {
        public static JsonSerializerSettings Settings { get; } = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver()
            {
                NamingStrategy = new CamelCaseNamingStrategy()
                {
                    ProcessDictionaryKeys = false,
                }
            },
            DateFormatHandling = DateFormatHandling.IsoDateFormat,
            NullValueHandling = NullValueHandling.Ignore
        };
    }
}
