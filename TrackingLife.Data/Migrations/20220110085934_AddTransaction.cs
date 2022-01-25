using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TrackingLife.Data.Migrations
{
    public partial class AddTransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transaction",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UniqueTransaction = table.Column<Guid>(nullable: false),
                    CurrentBalance = table.Column<float>(nullable: false),
                    LastTransactionDateTime = table.Column<DateTime>(nullable: false),
                    AccountBalanceId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transaction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transaction_AccountBalance_AccountBalanceId",
                        column: x => x.AccountBalanceId,
                        principalTable: "AccountBalance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_AccountBalanceId",
                table: "Transaction",
                column: "AccountBalanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_CurrentBalance",
                table: "Transaction",
                column: "CurrentBalance");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_LastTransactionDateTime",
                table: "Transaction",
                column: "LastTransactionDateTime");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_UniqueTransaction",
                table: "Transaction",
                column: "UniqueTransaction");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transaction");
        }
    }
}
