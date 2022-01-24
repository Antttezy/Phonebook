using System.ComponentModel.DataAnnotations;

namespace Task4.Core.Requests
{
    public class AddPhonebookEntryRequest
    {
        [Required]
        public string Name { get; set; }

        [Phone]
        [Required]
        public string PhoneNumber { get; set; }

        public string Mail { get; set; }

        public int? GroupId { get; set; }
    }
}
