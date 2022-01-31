using Microsoft.EntityFrameworkCore.Migrations;

namespace Directory.Migrations
{
    public partial class ModifyUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Names",
                table: "Contacts",
                newName: "FirstName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Contacts",
                newName: "Names");
        }
    }
}
