using DataAccessLayer.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Implementations
{
    public class RezervacijaRepository : IRezervacijaRepository
    {
        //dependency injection
        private readonly Context context;

        public RezervacijaRepository(Context context)
        {
            this.context = context;
        }
        public void Add(Rezervacija entity)
        {
            var grad = context.Gradovi.SingleOrDefault(g => g.GradId == entity.GradId);
            grad.Rezervacije.Add(entity);
            entity.Grad = grad;
            var korisnik = context.Korisnici.SingleOrDefault(k => k.Id == entity.KorisnikId);
            korisnik.Rezervacije.Add(entity);
            entity.Korisnik = korisnik;
            context.Rezervacije.Add(entity);
        }

        public List<Rezervacija> Delete(Rezervacija entity)
        {
            throw new NotImplementedException();
        }

        public List<Rezervacija> GetAll()
        {
            var rezervacije = context.Rezervacije.Include(r => r.Grad).Include(r => r.Korisnik).ToList();
            //var rezervacije = context.Rezervacije(r=>r.Grad).ToList();
            foreach (Rezervacija r in rezervacije)
            {
                r.Grad = context.Gradovi.SingleOrDefault(g => g.GradId == r.GradId);
                r.Korisnik = context.Korisnici.SingleOrDefault(k => k.Id == r.KorisnikId);
            }
            return rezervacije;
        }

        public Rezervacija SearchById(Rezervacija entity)
        {
            return context.Rezervacije.Single(r => r.RezervacijaId == entity.RezervacijaId);
        }

        public List<Rezervacija> SerachBy(Expression<Func<Rezervacija, bool>> predicate)
        {
            return context.Rezervacije.Where(predicate).Include(r => r.Grad).ToList();
        }

        public void Update(Rezervacija entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
    }
}
