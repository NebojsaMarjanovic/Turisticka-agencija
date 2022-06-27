using Domain.IdentityAuth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Context : IdentityDbContext<Korisnik>
    {


        public DbSet<Korisnik> Korisnici { get; set; }

        public DbSet<Grad> Gradovi { get; set; }

        public DbSet<Admin> Admins { get; set; }

        public DbSet<Klijent> Klijenti { get; set; }

        public DbSet<Rezervacija> Rezervacije { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb; Database=ItehProjekat;
            Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Admin>().HasBaseType<Korisnik>().ToTable("Admins");
            modelBuilder.Entity<Klijent>().HasBaseType<Korisnik>().ToTable("Klijenti");

            modelBuilder.Entity<Rezervacija>().HasKey(r => new { r.GradId, r.KorisnikId, r.RezervacijaId });

            modelBuilder.Entity<Rezervacija>().HasOne(r => r.Grad).WithMany(g => g.Rezervacije).HasForeignKey(r => r.GradId);
            modelBuilder.Entity<Rezervacija>().HasOne(r => r.Korisnik).WithMany(u => u.Rezervacije).HasForeignKey(r => r.KorisnikId);

        }
    }
}
