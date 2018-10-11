using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using assignment4.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace assignment4.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingListController : Controller
    {
        private readonly ShoppingListContext _context;

        public ShoppingListController(ShoppingListContext context)
        {
            _context = context;

            if (_context.ShoppingList.Count() == 0)
            {
                _context.ShoppingList.Add(new ShoppingItem { Title = "Google Pixel 3", Description = "A Google Product" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<ShoppingItem> GetAll()
        {
            return _context.ShoppingList.ToList();
        }

        [HttpGet("{id}", Name = "GetShoppingItem")]
        public IActionResult GetById(long id)
        {
            var item = _context.ShoppingList.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ShoppingItem item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.ShoppingList.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetShoppingItem", new { id = item.Id }, item);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var item = _context.ShoppingList.First(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }

            _context.ShoppingList.Remove(item);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}
