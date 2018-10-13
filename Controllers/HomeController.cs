using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using assignment4.Models;

namespace assignment4.Controllers
{
    [Route("item")]
    public class HomeController : Controller
    {
        private readonly ShoppingListContext _context;

        public HomeController(ShoppingListContext context) {
            _context = context;
        }

        [HttpGet("/")]
        public IActionResult Index()
        {
            var shopping_list = _context.ShoppingList.ToList();
            ViewBag.shopping_list = shopping_list;
            return View();
        }

        [HttpGet("delete/{id}")]
        public IActionResult DeleteItem(int id)
        {
            var item = _context.ShoppingList.FirstOrDefault(t => t.Id == id);
            ViewBag.item = item;
            return View("Delete");
        }

        [HttpGet("edit/{id}")]
        public IActionResult EditItem(int id)
        {
            var item = _context.ShoppingList.FirstOrDefault(t => t.Id == id);
            ViewBag.item = item;
            return View("Edit");
        }


    }
}
