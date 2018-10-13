using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace assignment4.Models
{
    public class ShoppingListContext : DbContext
    {

        public ShoppingListContext(DbContextOptions<ShoppingListContext> options)
            : base(options)
        {
            if (ShoppingList.Count() == 0)
            {
               ShoppingList.Add(new ShoppingItem { Title = "Google Pixel 3", Description = "A Google Product", Url= "https://cnet2.cbsistatic.com/img/dJQ02IDEQfy-luZiXNVF5knPIys=/830x467/2018/10/09/85540f05-6858-4946-963e-52f6d3f1d247/041-google-pixel-3-and-pixel-3-xl.jpg" });
               SaveChanges();
            }
        }

        public DbSet<ShoppingItem> ShoppingList { get; set; }
    }

}
