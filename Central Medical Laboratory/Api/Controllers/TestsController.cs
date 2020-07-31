using Central_Medical_Laboratory.Models;
using Microsoft.AspNetCore.Mvc;
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
            return _context.Tests;
        }
        
    }
}
