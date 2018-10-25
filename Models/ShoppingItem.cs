using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace assignment4.Models
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class ShoppingItem
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public int Price { get; set; }
    }
}
