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
                ShoppingList.Add(new ShoppingItem { Title = "Google Pixel 3", Description = "A Google Product", Url = "https://images.idgesg.net/images/article/2018/10/pixel_3_xl_bigger_notch_long-100776124-large.jpg" });
                SaveChanges();
            }
        }

        public DbSet<ShoppingItem> ShoppingList { get; set; }
    }

}
