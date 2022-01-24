using System.ComponentModel.DataAnnotations;

namespace Task4.Core.Requests
{
    public class AddGroupRequest
    {
        [Required]
        public string Name { get; set; }
    }
}
