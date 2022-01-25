using Microsoft.EntityFrameworkCore.Migrations;

namespace TrackingLife.Data.Migrations
{
    public partial class AddAccountBalanceProfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AccountBalanceId",
                table: "Profile",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Profile_AccountBalanceId",
                table: "Profile",
                column: "AccountBalanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Profile_AccountBalance_AccountBalanceId",
                table: "Profile",
                column: "AccountBalanceId",
                principalTable: "AccountBalance",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Profile_AccountBalance_AccountBalanceId",
                table: "Profile");

            migrationBuilder.DropIndex(
                name: "IX_Profile_AccountBalanceId",
                table: "Profile");

            migrationBuilder.DropColumn(
                name: "AccountBalanceId",
                table: "Profile");
        }
    }
}
