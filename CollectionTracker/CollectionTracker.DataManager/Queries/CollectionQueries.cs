using CollectionTracker.Core;
using CollectionTracker.DataManager.Data;
using Microsoft.EntityFrameworkCore;

namespace CollectionTracker.DataManager.Queries
{
    public class CollectionQueries
    {
        private readonly AppDbContext context;

        public CollectionQueries(AppDbContext ctx)
        {
            context = ctx;
        }

        public Collection GetById(int id)
        {
            return context.Collections.Include(i => i.Items).FirstOrDefault(i => i.Id == id);
        }

        public IEnumerable<Collection> GetAll()
        {
            return context.Collections.Include(i => i.Items).ToList();
        }

        public IEnumerable<Collection> GetByUser(string username)
        {
            return context.Collections.Include(i => i.Items).Where(x => x.UserName == username).ToList();
        }
    }
}
