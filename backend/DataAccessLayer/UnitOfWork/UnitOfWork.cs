using DataAccessLayer.Implementations;
using DataAccessLayer.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        //dependency injection
        private readonly Context context;

        public UnitOfWork(Context context)
        {
            this.context = context;
            AdminRepository = new AdminRepository(context);
            GradRepository = new GradRepository(context);
            KlijentRepository = new KlijentRepository(context);
            RezervacijeRepository = new RezervacijaRepository(context);
            KorisnikRepository = new KorisnikRepository(context);
        }

        public IAdminRepository AdminRepository { get; set; }
        public IGradRepository GradRepository { get; set; }
        public IKlijentRepository KlijentRepository { get; set; }
        public IRezervacijaRepository RezervacijeRepository { get; set; }
        public IKorisnikRepository KorisnikRepository { get; set; }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
