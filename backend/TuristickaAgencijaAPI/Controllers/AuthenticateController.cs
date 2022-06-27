using DataAccessLayer.UnitOfWork;
using Domain;
using Domain.IdentityAuth;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace TuristickaAgencijaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {

        private readonly UserManager<Korisnik> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private IUnitOfWork unitOfWork;


        public AuthenticateController(UserManager<Korisnik> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration,IUnitOfWork unitOfWork)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            this.unitOfWork = unitOfWork;
        }


        [SwaggerOperation(Summary = "Registrovanje klijenta")]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModelKlijent model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });
            Klijent user = new Klijent()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                Ime = model.Ime,
                Prezime = model.Prezime,
                BrTelefona = model.BrTelefona
                
                
            };
            ////BAZA KLIJENT
            unitOfWork.KlijentRepository.Add(user);
            /////

            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });
                if (!await roleManager.RoleExistsAsync(UserRoles.User))
                    await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

                if (await roleManager.RoleExistsAsync(UserRoles.User))
                {
                    await userManager.AddToRoleAsync(user, UserRoles.User);
                }
            }
            ////BAZA KLIJENT
            unitOfWork.Save();
            /////
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [SwaggerOperation(Summary = "Registrovanje admina")]
        [HttpPost]
        [Route("register - admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModelAdmin model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });
            Admin user = new Admin()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                Ime = model.Ime,
                Prezime = model.Prezime,
            };
            ///BAZA ADMIN
            unitOfWork.AdminRepository.Add(user);
            
            ///

            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });
            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            
            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }
            unitOfWork.Save();

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [SwaggerOperation(Summary = "Login korisnika (klijenta/admina)")]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);
                AuthenticationClaims.authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
                foreach (var userRole in userRoles)
                {
                    AuthenticationClaims.authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("OvoJeNekiStringZaJwtAutentifikaciju"));
                var token = new JwtSecurityToken(
                issuer: _configuration["JWT: ValidIssuer"],
                audience: _configuration["JWT: ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: AuthenticationClaims.authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
                var allRolesForUser = await userManager.GetRolesAsync(user);

                return Ok(new
                {
                    userRole = allRolesForUser.SingleOrDefault(),
                    userId = user.Id,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                }) ;
            }
            return Unauthorized();
        }


    }

}
