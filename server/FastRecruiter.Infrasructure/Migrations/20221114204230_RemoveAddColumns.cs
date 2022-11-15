using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FastRecruiter.Infrasructure.Migrations
{
    public partial class RemoveAddColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "ShortUrl",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "nbrCandidates",
                table: "Jobs",
                type: "int",
                nullable: false,
                defaultValue: 0);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShortUrl",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "nbrCandidates",
                table: "Jobs");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

        }
    }
}
