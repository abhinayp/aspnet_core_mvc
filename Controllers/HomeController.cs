using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using assignment4.Models;
using Microsoft.AspNetCore.Authorization;

namespace assignment4.Controllers
{
    public class HomeController : Controller
    {
        private readonly ShoppingListContext _context;

        public HomeController(ShoppingListContext context)
        {
            _context = context;

            if (_context.ShoppingList.Count() == 0)
            {
                _context.ShoppingList.Add(new ShoppingItem { Title = "Google Pixel 3", Description = "A Google Product", Url = "https://cnet2.cbsistatic.com/img/dJQ02IDEQfy-luZiXNVF5knPIys=/830x467/2018/10/09/85540f05-6858-4946-963e-52f6d3f1d247/041-google-pixel-3-and-pixel-3-xl.jpg" });
                _context.ShoppingList.Add(new ShoppingItem { Title = "Google Pixel 2", Description = "A Google Product", Url = "https://cnet2.cbsistatic.com/img/dJQ02IDEQfy-luZiXNVF5knPIys=/830x467/2018/10/09/85540f05-6858-4946-963e-52f6d3f1d247/041-google-pixel-3-and-pixel-3-xl.jpg" });
                _context.ShoppingList.Add(new ShoppingItem { Title = "Google Pixel 1", Description = "A Google Product", Url = "https://cnet2.cbsistatic.com/img/dJQ02IDEQfy-luZiXNVF5knPIys=/830x467/2018/10/09/85540f05-6858-4946-963e-52f6d3f1d247/041-google-pixel-3-and-pixel-3-xl.jpg" });
                _context.ShoppingList.Add(new ShoppingItem { Title = "Google Pixel", Description = "A Google Product", Url = "https://cnet2.cbsistatic.com/img/dJQ02IDEQfy-luZiXNVF5knPIys=/830x467/2018/10/09/85540f05-6858-4946-963e-52f6d3f1d247/041-google-pixel-3-and-pixel-3-xl.jpg" });
                _context.ShoppingList.Add(new ShoppingItem { Title = "iPhone X", Description = "An Apple Product", Url = "https://cnet2.cbsistatic.com/img/dJQ02IDEQfy-luZiXNVF5knPIys=/830x467/2018/10/09/85540f05-6858-4946-963e-52f6d3f1d247/041-google-pixel-3-and-pixel-3-xl.jpg" });
                _context.ShoppingList.Add(new ShoppingItem { Title = "iPhone XS", Description = "An Apple Product", Url = "https://cnet2.cbsistatic.com/img/dJQ02IDEQfy-luZiXNVF5knPIys=/830x467/2018/10/09/85540f05-6858-4946-963e-52f6d3f1d247/041-google-pixel-3-and-pixel-3-xl.jpg" });
                _context.SaveChanges();
            }
        }

        [Authorize]
        public IActionResult Index()
        {
            List<ShoppingItem> shooping_list = _context.ShoppingList.ToList();
            ViewBag.shopping_list = shooping_list;

            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
