using System.Collections.Generic;
using System.Threading.Tasks;

namespace Task4.Interfaces
{
    public interface IDatabaseSeeder<in T>
    {
        Task SeedAsync(IEnumerable<T> initialSet);
    }
}
