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
            return context.Collections.Include(c => c.Items)
                .ThenInclude(i => i.Likes) 
                .FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<Collection> GetAll()
        {
            return context.Collections.Include(c => c.Items)
                .ThenInclude(i => i.Likes).ToList();
        }

        public IEnumerable<Collection> GetByUser(string username)
        {
            return context.Collections.Include(c => c.Items)
                .ThenInclude(i => i.Likes).Where(c => c.UserName == username).ToList();
        }
    }
}
