using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHarmony.SQL.Migrations
{
    public partial class MakePairDoctorWeekdayInDailyScheduleTableUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DailySchedules_DoctorId",
                table: "DailySchedules");

            migrationBuilder.CreateIndex(
                name: "IX_DailySchedules_DoctorId_Weekday",
                table: "DailySchedules",
                columns: new[] { "DoctorId", "Weekday" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DailySchedules_DoctorId_Weekday",
                table: "DailySchedules");

            migrationBuilder.CreateIndex(
                name: "IX_DailySchedules_DoctorId",
                table: "DailySchedules",
                column: "DoctorId");
        }
    }
}
