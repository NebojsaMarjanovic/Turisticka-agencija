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
    internal class KorisnikRepository : IKorisnikRepository
    {
        //dependency injection
        private readonly Context context;

        public KorisnikRepository(Context context)
        {
            this.context = context;
        }

        public void Add(Korisnik entity)
        {
            context.Users.Add(entity);
        }

        public List<Korisnik> Delete(Korisnik entity)
        {
            throw new NotImplementedException();
        }

        public List<Korisnik> GetAll()
        {
            return context.Korisnici.ToList();
        }

        public Korisnik SearchById(Korisnik entity)
        {
            return context.Users.Include(k=>k.Rezervacije).Single(u => u.Id == entity.Id);
        }

        public List<Korisnik> SerachBy(Expression<Func<Korisnik, bool>> predicate)
        {
            return context.Users.Where(predicate).ToList();
        }

        public void Update(Korisnik entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
    }
    
    
}
