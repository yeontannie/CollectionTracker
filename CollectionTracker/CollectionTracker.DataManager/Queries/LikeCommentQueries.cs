using CollectionTracker.Core;
using CollectionTracker.DataManager.Data;

namespace CollectionTracker.DataManager.Queries
{
    public class LikeCommentQueries
    {
        private readonly AppDbContext context;

        public LikeCommentQueries(AppDbContext ctx)
        {
            context = ctx;
        }

        public bool IsAlreadyLiked(Item item, string username)
        {
            return item.Likes.Any(l => l.UserName == username);
        }

        public List<Like> GetLikes(int id)
        {
            return context.Likes.Where(l => l.ItemId == id).ToList();
        }

        public List<Comment> GetCommentsByItem(int id)
        {
            return context.Comments.Where(c => c.ItemId == id).ToList();
        }
    }
}
