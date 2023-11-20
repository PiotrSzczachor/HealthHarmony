using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHarmony.SQL.Migrations
{
    public partial class MakeClinicOptionalInDailyScheduleTableToHandleRemoteCase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "ClinicId",
                table: "DailySchedules",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "ClinicId",
                table: "DailySchedules",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);
        }
    }
}
