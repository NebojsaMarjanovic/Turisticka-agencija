using DataAccessLayer.UnitOfWork;
using Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace TuristickaAgencijaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KorisnikController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;
        public string LoggedInUser => User.Identity.Name;

        public KorisnikController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult GetKorisnik()
        {
            string username = AuthenticationClaims.authClaims.FirstOrDefault().Value;

            return Ok(username);
        }

    }

}


