using Microsoft.AspNetCore.Http;

namespace TuristickaAgencijaAPI.ViewModels
{
    public class GradViewModel
    {
        public string Naziv { get; set; }
        public string Drzava { get; set; }
        public double Cena { get; set; }

        public int Naseljenost { get; set; }
        public string Valuta { get; set; }
        public string Opis { get; set; }
        public IFormFile Slika { get; set; }
    }
}
