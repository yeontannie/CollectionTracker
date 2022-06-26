using CollectionTracker.Core;
using CollectionTracker.DataManager.Data;
using CollectionTracker.DataManager.Queries;

namespace CollectionTracker.DataManager.Commands
{
    public class CollectionCommands
    {
        private readonly AppDbContext context;
        private readonly CollectionQueries collectionQueries;

        public CollectionCommands(AppDbContext ctx, CollectionQueries collectionQ)
        {
            context = ctx;
            collectionQueries = collectionQ;
        }

        public async Task Add(Collection model)
        {
            context.Add(model);
            await context.SaveChangesAsync();
        }

        public async Task Edit(Collection model, int id)
        {
            var collection = collectionQueries.GetById(id);

            if(collection.Name != model.Name)
            {
                collection.Name = model.Name;
            }
            if (collection.Description != model.Description)
            {
                collection.Description = model.Description;
            }
            if (collection.Theme != model.Theme)
            {
                collection.Theme = model.Theme;
            }
            if (collection.ItemsAmount != model.ItemsAmount)
            {
                collection.ItemsAmount = model.ItemsAmount;
            }

            context.Update(collection);
            await context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            context.Remove(collectionQueries.GetById(id));
            await context.SaveChangesAsync();
        }
    }
}
