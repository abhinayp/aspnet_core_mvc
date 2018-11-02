using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace assignment4.Models
{
    public class UserDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public UserDbContext(DbContextOptions<UserDbContext> options)
                : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
