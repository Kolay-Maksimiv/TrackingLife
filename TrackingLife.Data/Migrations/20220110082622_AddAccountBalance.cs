using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TrackingLife.Data.Migrations
{
    public partial class AddAccountBalance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccountBalance",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UniqueAccount = table.Column<Guid>(nullable: false),
                    CurrentBalance = table.Column<float>(nullable: false),
                    LastTransactionDateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountBalance", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountBalance_CurrentBalance",
                table: "AccountBalance",
                column: "CurrentBalance");

            migrationBuilder.CreateIndex(
                name: "IX_AccountBalance_LastTransactionDateTime",
                table: "AccountBalance",
                column: "LastTransactionDateTime");

            migrationBuilder.CreateIndex(
                name: "IX_AccountBalance_UniqueAccount",
                table: "AccountBalance",
                column: "UniqueAccount");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountBalance");
        }
    }
}
