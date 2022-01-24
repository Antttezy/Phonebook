using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task4.Core.Services;
using Task4.Interfaces;

namespace Task4.Services
{
    public class DatabaseSeeder<T> : IDatabaseSeeder<T>
    {
        private readonly IRepository<T> repository;

        public DatabaseSeeder(IRepository<T> repository)
        {
            this.repository = repository;
        }

        public async Task SeedAsync(IEnumerable<T> initialSet)
        {
            var entries = await repository.GetRange(1, 0);

            if (!entries.Any())
            {
                foreach (var item in initialSet)
                {
                    await repository.Add(item);
                }
            }
        }
    }
}
