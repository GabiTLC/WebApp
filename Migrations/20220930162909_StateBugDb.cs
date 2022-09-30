using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp.Migrations
{
    public partial class StateBugDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Closed",
                table: "Bugs");

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Bugs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State",
                table: "Bugs");

            migrationBuilder.AddColumn<bool>(
                name: "Closed",
                table: "Bugs",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
