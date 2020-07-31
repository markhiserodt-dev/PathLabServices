using System;
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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=PathLabServices;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Test>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AlternateRequirement).HasColumnName("alternateRequirement");

                entity.Property(e => e.ClinicalSignificance).HasColumnName("clinicalSignificance");

                entity.Property(e => e.Code).HasColumnName("code");

                entity.Property(e => e.Comments).HasColumnName("comments");

                entity.Property(e => e.CptCode).HasColumnName("cptCode");

                entity.Property(e => e.DaysPerformed).HasColumnName("daysPerformed");

                entity.Property(e => e.Methodology).HasColumnName("methodology");

                entity.Property(e => e.MinimumVolume).HasColumnName("minimumVolume");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.PerformingLab).HasColumnName("performingLab");

                entity.Property(e => e.PreferredRequirement).HasColumnName("preferredRequirement");

                entity.Property(e => e.SpecialInstructions).HasColumnName("specialInstructions");

                entity.Property(e => e.Tat).HasColumnName("tat");

                entity.Property(e => e.TestIncluded).HasColumnName("testIncluded");

                entity.Property(e => e.TransportTemp).HasColumnName("transportTemp");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
