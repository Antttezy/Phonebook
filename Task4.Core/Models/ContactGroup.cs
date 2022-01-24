using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Task4.Core.Models
{
    public class ContactGroup
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public ICollection<PhonebookEntry> Contacts { get; set; } = new List<PhonebookEntry>();
    }
}
