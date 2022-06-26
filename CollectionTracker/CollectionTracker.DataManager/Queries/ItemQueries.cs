using CollectionTracker.Core;
using CollectionTracker.DataManager.Data;
using Microsoft.EntityFrameworkCore;

namespace CollectionTracker.DataManager.Queries
{
    public class ItemQueries
    {
        private readonly AppDbContext context;

        public ItemQueries(AppDbContext ctx)
        {
            context = ctx;
        }

        public Item GetById(int id)
        {
            return context.Items.Find(id);
        }

        public IEnumerable<Item> GetAll()
        {
            return context.Items.ToList();
        }

        public IEnumerable<Item> GetByCollection(int collectionId)
        {
            return context.Items.Where(x => x.CollectionId == collectionId).ToList();
        }
    }
}
