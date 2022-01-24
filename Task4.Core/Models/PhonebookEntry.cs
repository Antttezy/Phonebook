using System.ComponentModel.DataAnnotations;

namespace Task4.Core.Models
{
    public class PhonebookEntry
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Phone]
        [Required]
        public string PhoneNumber { get; set; }

        public string Mail { get; set; }

        public int? GroupId { get; set; }

        public ContactGroup Group { get; set; }
    }
}
