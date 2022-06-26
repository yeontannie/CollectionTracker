using CollectionTracker.Core;
using CollectionTracker.DataManager.Commands;
using CollectionTracker.DataManager.Queries;
using Microsoft.AspNetCore.Mvc;

namespace CollectionTracker.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly ItemCommands itemCommands;
        private readonly ItemQueries itemQueries;

        public ItemsController(ItemCommands itemC, ItemQueries itemQ)
        {
            itemCommands = itemC;
            itemQueries = itemQ;
        }

        [HttpPost]
        [Route("create-item")]
        public async Task<IActionResult> Create(Item model)
        {
            await itemCommands.Add(model);
            return Ok();
        }

        [HttpGet]
        [Route("get-all-items")]
        public IEnumerable<Item> GetAll()
        {
            return itemQueries.GetAll();
        }

        [HttpGet]
        [Route("get-items")]
        public IEnumerable<Item> GetByCollection(int id)
        {
            return itemQueries.GetByCollection(id);
        }

        [HttpPut]
        [Route("edit-item")]
        public async Task<IActionResult> Edit(Item model, int id)
        {
            await itemCommands.Edit(model, id);
            return Ok();
        }

        [HttpDelete]
        [Route("delete-item")]
        public async Task<IActionResult> Delete(int id)
        {
            await itemCommands.Delete(id);
            return Ok();
        }
    }
}
