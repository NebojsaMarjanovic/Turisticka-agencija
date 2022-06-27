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
    public class AdminRepository : IAdminRepository
    {
        //dependency injection
        private readonly Context context;

        public AdminRepository(Context context)
        {
            this.context = context;
        }
        public void Add(Admin entity)
        {
            context.Admins.Add(entity);
        }

        public List<Admin> Delete(Admin entity)
        {
            throw new NotImplementedException();
        }

        public List<Admin> GetAll()
        {
            return context.Admins.ToList();
        }

        public Admin SearchById(Admin entity)
        {
            return context.Admins.Single(g => g.Id == entity.Id);
        }

        public List<Admin> SerachBy(Expression<Func<Admin, bool>> predicate)
        {
            return context.Admins.Where(predicate).ToList();
        }

        public void Update(Admin entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
    }
}
