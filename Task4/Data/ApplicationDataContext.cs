using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using Task4.Core.Models;

namespace Task4.Data
{
    public class ApplicationDataContext : DbContext
    {
        public DbSet<PhonebookEntry> PhonebookEntries { get; set; }
        public DbSet<ContactGroup> ContactGroups { get; set; }

        public ApplicationDataContext([NotNull] DbContextOptions options) : base(options)
        {
        }
    }
}
