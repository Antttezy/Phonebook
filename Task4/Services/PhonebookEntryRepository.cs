using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task4.Core.Exceptions;
using Task4.Core.Models;
using Task4.Core.Services;
using Task4.Data;

namespace Task4.Services
{
    public class PhonebookEntryRepository : IRepository<PhonebookEntry>
    {
        private readonly ApplicationDataContext context;

        public PhonebookEntryRepository(ApplicationDataContext context)
        {
            this.context = context;
        }

        public async Task Add(PhonebookEntry item)
        {
            try
            {
                await context.PhonebookEntries.AddAsync(item);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new RepositoryAddException();
            }
        }

        public async Task<IEnumerable<PhonebookEntry>> FindAll(Func<PhonebookEntry, bool> predicate)
        {
            return await context.PhonebookEntries.Include(ph => ph.Group).AsNoTracking().Where(ph => predicate(ph)).ToListAsync();
        }

        public async Task<IEnumerable<PhonebookEntry>> GetAllAsync()
        {
            return await context.PhonebookEntries.Include(ph => ph.Group).AsNoTracking().ToListAsync();
        }

        public async Task<PhonebookEntry> GetById(int id)
        {
            PhonebookEntry item = await context.PhonebookEntries.Include(ph => ph.Group).FirstOrDefaultAsync(ph => ph.Id == id);

            return item ?? throw new NotFoundException();
        }

        public Task<IEnumerable<PhonebookEntry>> GetRange(int count, int offset)
        {
            throw new NotImplementedException();
        }

        public async Task Remove(PhonebookEntry item)
        {
            context.PhonebookEntries.Remove(item);

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new NotFoundException();
            }
        }

        public async Task Update(PhonebookEntry item)
        {
            context.PhonebookEntries.Update(item);

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new RepositoryUpdateException();
            }
        }
    }
}
