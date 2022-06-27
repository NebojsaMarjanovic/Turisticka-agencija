using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Rezervacija
    {
        public string KorisnikId { get; set; }
        public Korisnik Korisnik { get; set; }
        public int GradId { get; set; }
        public Grad Grad { get; set; }

        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int RezervacijaId { get; set; }
        public DateTime Polazak { get; set; }
        public DateTime Povratak { get; set; }
        public string Napomena { get; set; }
    }
}
