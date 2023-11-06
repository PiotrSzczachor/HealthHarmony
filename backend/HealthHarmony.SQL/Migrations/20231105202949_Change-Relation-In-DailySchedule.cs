using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHarmony.SQL.Migrations
{
    public partial class ChangeRelationInDailySchedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DailySchedules_ClinicId",
                table: "DailySchedules");

            migrationBuilder.DropIndex(
                name: "IX_DailySchedules_DoctorId",
                table: "DailySchedules");

            migrationBuilder.CreateIndex(
                name: "IX_DailySchedules_ClinicId",
                table: "DailySchedules",
                column: "ClinicId");

            migrationBuilder.CreateIndex(
                name: "IX_DailySchedules_DoctorId",
                table: "DailySchedules",
                column: "DoctorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DailySchedules_ClinicId",
                table: "DailySchedules");

            migrationBuilder.DropIndex(
                name: "IX_DailySchedules_DoctorId",
                table: "DailySchedules");

            migrationBuilder.CreateIndex(
                name: "IX_DailySchedules_ClinicId",
                table: "DailySchedules",
                column: "ClinicId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DailySchedules_DoctorId",
                table: "DailySchedules",
                column: "DoctorId",
                unique: true);
        }
    }
}
