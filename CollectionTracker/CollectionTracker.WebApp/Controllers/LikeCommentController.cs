using CollectionTracker.Core;
using CollectionTracker.DataManager.Commands;
using CollectionTracker.DataManager.Queries;
using Microsoft.AspNetCore.Mvc;

namespace CollectionTracker.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeCommentController : ControllerBase
    {
        private readonly LikeCommentCommands lcCommands;
        private readonly LikeCommentQueries lcQueries;
        private readonly ItemQueries itemQueries;

        public LikeCommentController(LikeCommentCommands lcC, LikeCommentQueries lcQ,
            ItemQueries itemQ)
        {
            lcCommands = lcC;
            lcQueries = lcQ;
            itemQueries = itemQ;
        }

        [HttpPut]
        [Route("like-item")]
        public async Task<IActionResult> Like(Like model, string currentUser)
        {
            var item = itemQueries.GetItemWithLikes(model.ItemId);
            item.Likes = item.Likes ?? new List<Like>();

            if (ModelState.IsValid)
            {
                if (lcQueries.IsAlreadyLiked(item, currentUser))
                {
                    await lcCommands.RemoveLike(item, currentUser);
                }
                else
                {
                    await lcCommands.Like(model);
                }
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet]
        [Route("get-comments")]
        public IEnumerable<Comment> GetComments(int id)
        {
            return lcQueries.GetCommentsByItem(id);
        }

        [HttpPost]
        [Route("add-comment")]
        public async Task<IActionResult> AddComment(Comment model)
        {
            await lcCommands.AddComment(model);
            return Ok();
        }
    }
}
