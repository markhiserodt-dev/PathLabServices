using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using Central_Medical_Laboratory.Api.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Central_Medical_Laboratory.Models;

namespace Central_Medical_Laboratory.Api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IConfiguration _config;
        private readonly PathLabServicesContext _context;

        public AccountController (IConfiguration config, PathLabServicesContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserCredentials usercredentials)
        {
            IActionResult response = Unauthorized();

            var user = Authenticate(usercredentials);

            if (user != null)
            {
                user.Jwt = GenerateJSONWebToken(usercredentials);
                response = Ok(user);
            }

            return response;
        }

        private User Authenticate(UserCredentials usercredentials)
        {
            User user = null;

            if (usercredentials.Email == "markhiserodt@gmail.com" && usercredentials.Password == "1234")
            {
                user = new User{
                    Email = usercredentials.Email,
                    Password = usercredentials.Password,
                    FirstName = "Mark",
                    LastName = "Hiserodt"
                };
            }

            return user;
        }

        private string GenerateJSONWebToken(UserCredentials usercredentials)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usercredentials.Email),
                new Claim(JwtRegisteredClaimNames.Email, usercredentials.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            var encodetoken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodetoken;
        }
    }
}
