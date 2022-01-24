using System.Text.Json.Serialization;

namespace Task4.Core.Objects
{
    public class ErrorObject
    {
        [JsonIgnore]
        public int ErrorCode { get; set; }
        public string Description { get; set; }
    }
}
