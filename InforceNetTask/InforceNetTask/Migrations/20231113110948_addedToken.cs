using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InforceNetTask.Migrations
{
    /// <inheritdoc />
    public partial class addedToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "urls",
                newName: "createdDate");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "urls",
                newName: "createdBy");

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "users");

            migrationBuilder.RenameColumn(
                name: "createdDate",
                table: "urls",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "createdBy",
                table: "urls",
                newName: "CreatedBy");
        }
    }
}
