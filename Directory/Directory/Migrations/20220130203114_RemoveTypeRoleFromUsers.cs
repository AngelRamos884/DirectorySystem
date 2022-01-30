using Microsoft.EntityFrameworkCore.Migrations;

namespace Directory.Migrations
{
    public partial class RemoveTypeRoleFromUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_RoleTypes_RoleTypeId1",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_RoleTypeId1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RoleTypeId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RoleTypeId1",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoleTypeId",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoleTypeId1",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleTypeId1",
                table: "Users",
                column: "RoleTypeId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_RoleTypes_RoleTypeId1",
                table: "Users",
                column: "RoleTypeId1",
                principalTable: "RoleTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
