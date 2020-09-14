using System;
using Central_Medical_Laboratory.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Central_Medical_Laboratory.Models
{
    public partial class PathLabServicesContext : DbContext
    {
        public PathLabServicesContext()
        {
        }

        public PathLabServicesContext(DbContextOptions<PathLabServicesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Test> Tests { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=PathLabServices;Trusted_Connection=True;");
            }
        }
    }
}
