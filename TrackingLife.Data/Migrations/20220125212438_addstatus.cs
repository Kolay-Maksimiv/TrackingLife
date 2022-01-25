using Microsoft.EntityFrameworkCore.Migrations;

namespace TrackingLife.Data.Migrations
{
    public partial class addstatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Transaction",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_Status",
                table: "Transaction",
                column: "Status");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Transaction_Status",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Transaction");
        }
    }
}
