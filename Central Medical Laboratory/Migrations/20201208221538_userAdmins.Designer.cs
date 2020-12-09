﻿// <auto-generated />
using System;
using Central_Medical_Laboratory.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Central_Medical_Laboratory.Migrations
{
    [DbContext(typeof(PathLabServicesContext))]
    [Migration("20201208221538_userAdmins")]
    partial class userAdmins
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Central_Medical_Laboratory.Api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Jwt")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isAdmin")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Central_Medical_Laboratory.Models.Test", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AlternateRequirement")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClinicalSignificance")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Code")
                        .HasColumnType("int");

                    b.Property<string>("Comments")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CptCode")
                        .HasColumnType("int");

                    b.Property<string>("DaysPerformed")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Methodology")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MinimumVolume")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PerformingLab")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PreferredRequirement")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SpecialInstructions")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestIncluded")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TransportTemp")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tests");
                });
#pragma warning restore 612, 618
        }
    }
}
