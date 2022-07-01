using CollectionTracker.Core;
using CollectionTracker.DataManager.Data;

namespace CollectionTracker.DataManager.Commands
{
    public class LikeCommentCommands
    {
        private readonly AppDbContext context;

        public LikeCommentCommands(AppDbContext ctx)
        {
            context = ctx;
        }

        public async Task Like(Like model)
        {
            context.Add(model);
            await context.SaveChangesAsync();
        }

        public async Task RemoveLike(Item item, string username)
        {
            context.Remove(item.Likes.FirstOrDefault(l => l.UserName == username));
            await context.SaveChangesAsync();
        }

        public async Task DeleteLike(List<Like> likes)
        {
            foreach (var l in likes)
            {
                context.Remove(l);
            }
            await context.SaveChangesAsync();
        }

        public async Task DeleteComment(List<Comment> comments)
        {
            foreach (var c in comments)
            {
                context.Remove(c);
            }
            await context.SaveChangesAsync();
        }

        public async Task AddComment(Comment model)
        {
            context.Add(model);
            await context.SaveChangesAsync();
        }
    }
}
