using DataAccessLayer.UnitOfWork;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Linq;

namespace TuristickaAgencijaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RezervacijeController : ControllerBase
    {
        private IUnitOfWork unitOfWork;

        public RezervacijeController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [SwaggerOperation(Summary = "Prikaz svih rezervacija")]
        [HttpGet]
        public IActionResult GetRezervacije()
        {
            return Ok(unitOfWork.RezervacijeRepository.GetAll());
        }

        [SwaggerOperation(Summary = "Dodavanje rezervacija")]
        [HttpPost]
        public IActionResult AddRezervacija(Rezervacija rezervacija)
        {
            
            unitOfWork.RezervacijeRepository.Add(rezervacija);
            unitOfWork.Save();

            return Ok();
        }

        [SwaggerOperation(Summary = "Prikaz svih rezervacija za datog korisnika")]
        [HttpGet("{id}")]
        public IActionResult GetRezervacijeKorisnika(string id)
        {


            var rezervacije = unitOfWork.RezervacijeRepository.SerachBy(x => x.Korisnik.Id == id);

            return Ok(rezervacije);
        }
    }
}
