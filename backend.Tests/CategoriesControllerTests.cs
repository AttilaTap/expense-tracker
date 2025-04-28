using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Controllers;
using ExpenseTracker.Data;
using ExpenseTracker.Models;
using NUnit.Framework;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace ExpenseTracker.Tests
{
    public class CategoriesControllerTests
    {
        private AppDbContext _context;
        private CategoriesController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            _context = new AppDbContext(options);
            _controller = new CategoriesController(_context);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Test]
        public async Task GetCategories_ReturnsCategories_ForUser()
        {
            _context.Categories.Add(new Category { Name = "TestCategory", UserId = 1 });
            await _context.SaveChangesAsync();

            var result = await _controller.GetCategories(1);
            var categories = result.Value.ToList();

            Assert.That(categories.Count, Is.EqualTo(1));
            Assert.That(categories[0].Name, Is.EqualTo("TestCategory"));
        }

        [Test]
        public async Task CreateCategory_ReturnsBadRequest_WhenCategoryAlreadyExists()
        {
            _context.Categories.Add(new Category { Name = "ExistingCategory", UserId = 1 });
            await _context.SaveChangesAsync();

            var newCategory = new Category { Name = "ExistingCategory", UserId = 1 };

            var result = await _controller.CreateCategory(newCategory);

            Assert.That(result.Result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task DeleteCategory_ReturnsNotFound_WhenCategoryDoesNotExist()
        {
            var result = await _controller.DeleteCategory(999);

            Assert.That(result, Is.InstanceOf<NotFoundResult>());
        }
    }
}
