using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// Database connection
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
Console.WriteLine($"Using connection string: {connectionString}");

// Configure retry policy
var maxRetries = 30; // Increase max retries
var delay = TimeSpan.FromSeconds(2);
var timeout = TimeSpan.FromMinutes(5); // Set a maximum timeout
var startTime = DateTime.UtcNow;

while (DateTime.UtcNow - startTime < timeout)
{
    try
    {
        using var connection = new MySqlConnection(connectionString);
        connection.Open();
        connection.Close();
        Console.WriteLine("Successfully connected to the database.");
        break;
    }
    catch (MySqlException ex)
    {
        if (DateTime.UtcNow - startTime + delay > timeout)
        {
            Console.WriteLine($"Failed to connect to the database after {timeout.TotalSeconds} seconds. Error: {ex.Message}");
            throw;
        }
        Console.WriteLine($"Database connection attempt failed. Retrying in {delay.TotalSeconds} seconds...");
        Thread.Sleep(delay);
    }
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
    mySqlOptions =>
    {
        mySqlOptions.EnableRetryOnFailure(
            maxRetryCount: 10,
            maxRetryDelay: TimeSpan.FromSeconds(5),
            errorNumbersToAdd: null);
    }));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// JWT Authentication
builder.Services.AddAuthentication("Bearer").AddJwtBearer(options =>
{
    var jwtKey = Environment.GetEnvironmentVariable("Jwt__Key") ?? throw new InvalidOperationException("JWT Key not found in environment variables");
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();

// CORS + Auth
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Expense Tracker API V1");
    c.RoutePrefix = "swagger";
});

// Static files for frontend
app.UseDefaultFiles();
app.UseStaticFiles();

// API controllers
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

app.Run();
