using DataAccessLayer.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Implementations
{
    public class KlijentRepository : IKlijentRepository
    {
        //dependency injection
        private readonly Context context;

        public KlijentRepository(Context context)
        {
            this.context = context;
        }
        public void Add(Klijent entity)
        {
            context.Klijenti.Add(entity);
        }

        public List<Klijent> Delete(Klijent entity)
        {
            throw new NotImplementedException();
        }

        public List<Klijent> GetAll()
        {
            return context.Klijenti.ToList();
        }

        public Klijent SearchById(Klijent entity)
        {
            return context.Klijenti.Single(k => k.Id == entity.Id);
        }

        public List<Klijent> SerachBy(Expression<Func<Klijent, bool>> predicate)
        {
            return context.Klijenti.Where(predicate).ToList();
        }

        public void Update(Klijent entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
    }
}
