using DataAccessLayer.UnitOfWork;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using TuristickaAgencijaAPI.ViewModels;

namespace TuristickaAgencijaAPI.Controllers
{
    [Route("[controller]")]             
    [ApiController]
    public class GradController : ControllerBase
    {
        private IUnitOfWork unitOfWork;
        private readonly IHostingEnvironment _hostingEnv;

        public GradController(IUnitOfWork unitOfWork, IHostingEnvironment hostingEnv)
        {
            _hostingEnv = hostingEnv;
            this.unitOfWork = unitOfWork;
        }


        [SwaggerOperation(Summary = "Prikaz svih gradove")]
        //[Authorize(Roles ="Admin")]
        [HttpGet]
        public List<Grad> GetGradovi()
        {
            return unitOfWork.GradRepository.GetAll();
        }


        [SwaggerOperation(Summary = "Dodavanje novog grada")]
        [HttpPost]
        public async Task<IActionResult> AddGrad([FromForm] GradViewModel gradViewModel)
        {
            if (gradViewModel.Slika != null)
            {
                var a = _hostingEnv.WebRootPath;
                var fileName = Path.GetFileName(gradViewModel.Slika.FileName);
                var filePath = Path.Combine("C:\\Users\\Korisnik\\Desktop\\front\\public",fileName);

                using (var fileSteam = new FileStream(filePath, FileMode.Create))
                {
                    await gradViewModel.Slika.CopyToAsync(fileSteam);
                }

                Grad grad = new Grad();
                grad.Naziv = gradViewModel.Naziv;
                grad.Naseljenost = gradViewModel.Naseljenost;
                grad.Opis = gradViewModel.Opis;
                grad.Valuta = gradViewModel.Valuta;

                grad.ImgFile = fileName;
                grad.ImgPath = filePath;  //save the filePath to database ImagePath field.

                unitOfWork.GradRepository.Add(grad);
                unitOfWork.Save();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [SwaggerOperation(Summary = "Prikaz grada sa datim identifikatorom")]
        [HttpGet("{id}")]
        public IActionResult GetGrad(int id)
        {

            var grad = new Grad { GradId = id };
            return Ok(unitOfWork.GradRepository.SearchById(grad));
        }

        [SwaggerOperation(Summary = "Azuriranje grada")]
        [HttpPut]
        public IActionResult UpdateGrad(Grad grad)
        {
            unitOfWork.GradRepository.Update(grad);
            unitOfWork.Save();
            return Ok();
        }

        [SwaggerOperation(Summary = "Brisanje grada")]
        [HttpDelete("{id}")]
        public IActionResult DeleteGrad(int id)
        {
            var grad = new Grad { GradId = id };
            List<Grad> result =unitOfWork.GradRepository.Delete(grad);
            unitOfWork.Save();

            return Ok(result);
        }


    }
}
