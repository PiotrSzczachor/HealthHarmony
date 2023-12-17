using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHarmony.SQL.Migrations
{
    public partial class Add_Symptoms_Column_To_Visits_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Symptoms",
                table: "Visits",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Symptoms",
                table: "Visits");
        }
    }
}
