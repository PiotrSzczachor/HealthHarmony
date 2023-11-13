using HealthHarmony.Addresses.Interfaces;
using HealthHarmony.Addresses.Services;
using HealthHarmony.Auth.Interfaces;
using HealthHarmony.Models.Auth.Entities;
using HealthHarmony.Auth.Services;
using HealthHarmony.Clinics.Interfaces;
using HealthHarmony.Clinics.Services;
using HealthHarmony.Doctors.Interfaces;
using HealthHarmony.Doctors.Services;
using HealthHarmony.SQL;
using HealthHarmony.SQLRepository.Implementation;
using HealthHarmony.SQLRepository.Interfaces;
using HealthHarmony.WebApi.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;
using HealthHarmony.Visits.Interfaces;
using HealthHarmony.Visits.Services;
using HealthHarmony.Common.Helpers;

var builder = WebApplication.CreateBuilder(args);

var configurationBuilder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .AddEnvironmentVariables();

IConfiguration configuration = configurationBuilder.Build();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
    {
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Name = "Authorization",
            Description = "Bearer Authentication with JWT Token",
            Type = SecuritySchemeType.Http
        });
        options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Id = "Bearer",
                            Type = ReferenceType.SecurityScheme
                        }
                    },
                    new List<string>()
                }
            });
    });

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<HealthHarmonyContext>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("Local")));
builder.Services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<HealthHarmonyContext>()
                .AddDefaultTokenProviders();

builder.Services.AddScoped<IRepository, Repository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAddressesService, AddressesService>();
builder.Services.AddScoped<IClinicsService, ClinicsService>();
builder.Services.AddScoped<IDoctorsService, DoctrosService>();
builder.Services.AddScoped<IVisitsService, VisitsService>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddAuthentication(opt => {
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})  
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration.GetSection("JWT:ValidIssuer").Value,
            ValidAudience = configuration.GetSection("JWT:ValidAudience").Value,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("JWT:Secret").Value))
        };
    });

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
    options.JsonSerializerOptions.Converters.Add(new TimeOnlyJsonConverter());
});

var app = builder.Build();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials()
           .SetIsOriginAllowed(origin => true));


app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseDeveloperExceptionPage();

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.MapControllers();

app.Run();
