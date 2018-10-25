using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using assignment4.Models;
using Newtonsoft.Json;

namespace assignment4.Controllers
{
    [Route("item")]
    public class HomeController : Controller
    {
        private ShoppingListClient shoppingListClient = new ShoppingListClient("https://localhost:25234");

        [HttpGet("/", Name = "home")]
        public IActionResult Index()
        {
            return View("Index");
        }

        [HttpGet]
        public async Task<IActionResult> IndexAsync()
        {
            var shopping_list = await shoppingListClient.getAll();
            return new ObjectResult(shopping_list);
        }

        [HttpGet("{id}", Name = "item")]
        public async Task<IActionResult> ItemAsync(int id)
        {
            var item = await shoppingListClient.getItem(id);
            return new ObjectResult(item);
        }

        [HttpGet("edit/{id}")]
        public async Task<IActionResult> EditItemAsync(int id)
        {
            var item = await shoppingListClient.getItem(id);
            return new ObjectResult(item);
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] ShoppingItem item)
        {

            var shopping_item = await shoppingListClient.UpdateItem(id, item);
            ViewBag.item = shopping_item;
            return new ObjectResult(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ShoppingItem item)
        {
            var shopping_item = await shoppingListClient.AddItem(item);
            return RedirectToAction(shopping_item.Id.ToString(), "item");
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var shopping_item = await shoppingListClient.DeleteItem(id);
            return new RedirectResult("~/");
        }


    }
}
