using Microsoft.EntityFrameworkCore.Migrations;

namespace Central_Medical_Laboratory.Migrations
{
    public partial class UsersTestsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CptCode = table.Column<int>(nullable: true),
                    PreferredRequirement = table.Column<string>(nullable: true),
                    AlternateRequirement = table.Column<string>(nullable: true),
                    MinimumVolume = table.Column<string>(nullable: true),
                    TransportTemp = table.Column<string>(nullable: true),
                    Tat = table.Column<string>(nullable: true),
                    Methodology = table.Column<string>(nullable: true),
                    DaysPerformed = table.Column<string>(nullable: true),
                    SpecialInstructions = table.Column<string>(nullable: true),
                    Comments = table.Column<string>(nullable: true),
                    TestIncluded = table.Column<string>(nullable: true),
                    PerformingLab = table.Column<string>(nullable: true),
                    ClinicalSignificance = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Jwt = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tests");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
