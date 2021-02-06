using Central_Medical_Laboratory.Api.Models;
using Central_Medical_Laboratory.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Central_Medical_Laboratory.Api.Controllers
{
    [Route("api/tests")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class TestsController : ControllerBase
    {
        private readonly PathLabServicesContext _context;
        
        public TestsController(PathLabServicesContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Test> GetTests()
        {
            var tests = _context.Tests;
            return tests;
        }

        [HttpGet("{id}")]
        public Test GetTest([FromRoute] int id)
        {
            return _context.Tests.Where(test =>
                test.Id == id).FirstOrDefault();
        }

        [HttpPost("search")]
        public SearchResult SearchTests([FromBody] SearchRequest req)
        {
            var searchResult = new SearchResult();

            var tests = _context.Tests.Where(test => 
                 test.Name.ToLower().IndexOf(req.SearchText) > -1 &&
                 test.Name.ToLower().IndexOf(req.SelectedLetter) == 0);

            searchResult.length = tests.Count();

            tests = tests.Skip(req.PageIndex * req.PageSize).Take(req.PageSize);

            searchResult.tests = tests;

            return searchResult;
        }

        [HttpPost("add")]
        public IActionResult AddTest([FromBody] Test test)
        {
            _context.Tests.Add(test);
            _context.SaveChanges();
            return Ok(test);
        }

        [HttpPost("edit")]
        public IActionResult EditTest([FromBody] Test test)
        {
            _context.Entry(test).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok(test);
        }
        
    }
}
