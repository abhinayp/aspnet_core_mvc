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
               ShoppingList.Add(new ShoppingItem { Title = "Google Pixel 3", Description = "A Google Product" });
               SaveChanges();
            }
        }

        public DbSet<ShoppingItem> ShoppingList { get; set; }
    }

}
