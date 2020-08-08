using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Central_Medical_Laboratory.Api.Models
{
    public class User
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Jwt { get; set; }
    }
}
