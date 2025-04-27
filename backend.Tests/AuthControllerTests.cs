using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ExpenseTracker.Controllers;
using ExpenseTracker.Data;
using ExpenseTracker.Models;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExpenseTracker.Tests
{
    public class AuthControllerTests
    {
        private AppDbContext _context;
        private AuthController _controller;
        private IConfiguration _configuration;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "AuthTestDb")
                .Options;

            _context = new AppDbContext(options);

            var config = new Dictionary<string, string>
            {
                { "Jwt:Key", "super_secret_test_key_1234567890" }
            };
            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(config)
                .Build();

            _controller = new AuthController(_context, _configuration);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Test]
        public async Task Register_NewUser_ReturnsOk()
        {
            var result = await _controller.Register("newuser", "password123");

            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async Task Register_DuplicateUsername_ReturnsBadRequest()
        {
            await _controller.Register("existinguser", "password123");

            var result = await _controller.Register("existinguser", "password456");

            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task Login_NonExistentUser_ReturnsBadRequest()
        {
            var result = await _controller.Login("nouser", "anyPassword");

            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task Login_WrongPassword_ReturnsBadRequest()
        {
            await _controller.Register("testuser", "correctPassword");

            var result = await _controller.Login("testuser", "wrongPassword");

            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task Login_CorrectCredentials_ReturnsOk()
        {
            await _controller.Register("validuser", "mypassword");

            var result = await _controller.Login("validuser", "mypassword");

            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }
    }
}
