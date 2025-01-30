using FamilyNewsletters.Data.Context;
using FamilyNewsletters.Logic;
using Microsoft.EntityFrameworkCore;

namespace FamilyNewsletters.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddTransient<IContactService, ContactService>();

            //*********************** Register DbContext and provide ConnectionString .***********************
            var connString = builder.Configuration.GetConnectionString("FamilyNewsletterConnectionString");
            builder.Services.AddDbContext<ContactDbContext>(db => db.UseSqlite(connString), ServiceLifetime.Singleton);
            //*********************** Register DbContext end.***********************

            builder.Services.AddAutoMapper(typeof(ContactDbContext));

            builder.Services.AddCors(opts =>
            {
                opts.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    //.AllowCredentials();
                });
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // global cors policy
            app.UseCors("AllowAll");

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
