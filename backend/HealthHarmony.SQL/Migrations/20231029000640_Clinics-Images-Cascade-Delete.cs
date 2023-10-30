using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHarmony.SQL.Migrations
{
    public partial class ClinicsImagesCascadeDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Clinics_ClinicId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Clinics_ClinicId",
                table: "Images",
                column: "ClinicId",
                principalTable: "Clinics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Clinics_ClinicId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Clinics_ClinicId",
                table: "Images",
                column: "ClinicId",
                principalTable: "Clinics",
                principalColumn: "Id");
        }
    }
}
