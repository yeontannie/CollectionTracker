using CollectionTracker.Core;
using CollectionTracker.DataManager.Data;
using CollectionTracker.DataManager.Queries;

namespace CollectionTracker.DataManager.Commands
{
    public class ItemCommands
    {
        private readonly AppDbContext context;
        private readonly ItemQueries itemQueries;
        private readonly LikeCommentQueries lcQueries;
        private readonly LikeCommentCommands lcCommands;

        public ItemCommands(AppDbContext ctx, ItemQueries itemQ, 
            LikeCommentQueries lcQ, LikeCommentCommands lcC)
        {
            context = ctx;
            itemQueries = itemQ;
            lcQueries = lcQ;
            lcCommands = lcC;
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
            var likes = lcQueries.GetLikes(id);
            var comments = lcQueries.GetCommentsByItem(id);

            if (likes.Capacity != 0)
            {
                await lcCommands.DeleteLike(likes);
            }
            else if(comments.Capacity != 0)
            {
                await lcCommands.DeleteComment(comments);
            }

            context.Remove(itemQueries.GetById(id));
            await context.SaveChangesAsync();
        }
    }
}
