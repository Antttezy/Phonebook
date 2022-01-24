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
    public class GroupRepository : IRepository<ContactGroup>
    {
        private readonly ApplicationDataContext context;

        public GroupRepository(ApplicationDataContext context)
        {
            this.context = context;
        }

        public async Task Add(ContactGroup item)
        {
            try
            {
                await context.ContactGroups.AddAsync(item);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new RepositoryAddException();
            }
        }

        public Task<IEnumerable<ContactGroup>> FindAll(Func<ContactGroup, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ContactGroup>> GetAllAsync()
        {
            return await context.ContactGroups.Include(g => g.Contacts).AsNoTracking().ToListAsync();
        }

        public async Task<ContactGroup> GetById(int id)
        {
            ContactGroup item = await context.ContactGroups.Include(g => g.Contacts).FirstOrDefaultAsync(g => g.Id == id);

            return item ?? throw new NotFoundException();
        }

        public async Task<IEnumerable<ContactGroup>> GetRange(int count, int offset)
        {
            return await context.ContactGroups.Include(g => g.Contacts).OrderBy(g => g.Id).Skip(offset).Take(count).AsNoTracking().ToListAsync();
        }

        public async Task Remove(ContactGroup item)
        {
            context.ContactGroups.Remove(item);

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new NotFoundException();
            }
        }

        public async Task Update(ContactGroup item)
        {
            context.ContactGroups.Update(item);

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
