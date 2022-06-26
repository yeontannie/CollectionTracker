using CollectionTracker.Core;
using CollectionTracker.DataManager.Data;
using CollectionTracker.DataManager.Queries;

namespace CollectionTracker.DataManager.Commands
{
    public class ItemCommands
    {
        private readonly AppDbContext context;
        private readonly ItemQueries itemQueries;

        public ItemCommands(AppDbContext ctx, ItemQueries itemQ)
        {
            context = ctx;
            itemQueries = itemQ;
        }

        public async Task Add(Item model)
        {
            context.Add(model);
            await context.SaveChangesAsync();
        }

        public async Task Edit(Item model, int id)
        {
            var item = itemQueries.GetById(id);

            if (item.Name != model.Name)
            {
                item.Name = model.Name;
            }
            if (item.CollectionId != model.CollectionId)
            {
                item.CollectionId = model.CollectionId;
            }

            context.Update(item);
            await context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            context.Remove(itemQueries.GetById(id));
            await context.SaveChangesAsync();
        }
    }
}
