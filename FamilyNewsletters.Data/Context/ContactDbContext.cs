using FamilyNewsletters.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using System.Security.Cryptography.X509Certificates;

namespace FamilyNewsletters.Data.Context
{
    public class ContactDbContext : DbContext
    {
        //protected override void OnConfiguring(DbContextOptionsBuilder optionbuilder)
        //{
        //    optionbuilder.UseSqlite(@"Data Source=FamilyNewsletters.db");
        //}

        public ContactDbContext(DbContextOptions<ContactDbContext> options) : base(options)
        {
        }

        // Registered DB Model in OurHeroDbContext file
        public DbSet<Contacts> Contacts { get; set; }

        /*
         OnModelCreating mainly used to configured our EF model
         And insert master data if required
        */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Setting a primary key in OurHero model
            modelBuilder.Entity<Contacts>(eb =>
            {
                eb.HasKey(x => x.Id);
                eb.Property(b => b.FirstName).HasColumnType("varchar(50)").IsRequired();
                eb.Property(b => b.LastName).HasColumnType("varchar(50)").IsRequired();
                eb.Property(b => b.EmailAddress).HasColumnType("varchar(100)").IsRequired(false);
                eb.Property(b => b.Birthday).HasColumnType("datetime").IsRequired(true);
                eb.Property(b => b.IsContributor).HasColumnType("bit").IsRequired().HasDefaultValue(false);
                eb.Property(b => b.IsActive).HasColumnType("bit").IsRequired().HasDefaultValue(true);
                eb.Property(b => b.Administrator).HasColumnType("bit").IsRequired().HasDefaultValue(false);
                eb.Property(b => b.IsRecipient).HasColumnType("bit").IsRequired().HasDefaultValue(false);
            });
        }
    }
}
