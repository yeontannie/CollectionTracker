using CollectionTracker.Core;
using CollectionTracker.Core.Requests;
using CollectionTracker.DataManager.Commands;
using CollectionTracker.DataManager.Queries;
using Microsoft.AspNetCore.Mvc;

namespace CollectionTracker.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly CollectionQueries collectionQueries;
        private readonly CollectionCommands collectionCommands;

        public CollectionController(CollectionQueries collectionQ, CollectionCommands collectionC)
        {
            collectionQueries = collectionQ;
            collectionCommands = collectionC;
        }

        [HttpGet]
        [Route("get-all-collections")]
        public IEnumerable<Collection> GetAll()
        {
            return collectionQueries.GetAll();
        }

        [HttpGet]
        [Route("get-by-id")]
        public Collection GetById(int id)
        {
            return collectionQueries.GetById(id);
        }

        [HttpPost]
        [Route("create-collection")]
        public async Task<IActionResult> Create(Collection model)
        {
            await collectionCommands.Add(model);
            return Ok();
        }

        [HttpPut]
        [Route("edit-collection")]
        public async Task<IActionResult> Edit(Collection model, int id)
        {
            await collectionCommands.Edit(model, id);
            return Ok();
        }

        [HttpDelete]
        [Route("delete-collection")]
        public async Task<IActionResult> Delete(int id)
        {
            await collectionCommands.Delete(id);
            return Ok();
        }

        [HttpGet]
        [Route("get-my-collections")]
        public IEnumerable<Collection> GeByUser(string username)
        {
            return collectionQueries.GetByUser(username);
        }
    }
}
