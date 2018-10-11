using System;
using Microsoft.EntityFrameworkCore;

namespace assignment4.Models
{
    public class ShoppingListContext : DbContext
    {
        public ShoppingListContext(DbContextOptions<ShoppingListContext> options)
            : base(options)
        {
        }

        public DbSet<ShoppingItem> ShoppingList { get; set; }
    }
}
