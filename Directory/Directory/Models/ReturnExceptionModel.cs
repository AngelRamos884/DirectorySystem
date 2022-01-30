
namespace Directory.Models
{
    public class ReturnExceptionModel
    {
        public string StatusCode { get; set; }
        public string Message { get; set; }
        public bool IsSqlDbError { get; set; }
    }
}
