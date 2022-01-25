using Microsoft.EntityFrameworkCore.Migrations;

namespace TrackingLife.Data.Migrations
{
    public partial class addstatus1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Transaction",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Status",
                table: "Transaction",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
