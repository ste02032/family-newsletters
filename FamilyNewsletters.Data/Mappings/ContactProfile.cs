using AutoMapper;
using FamilyNewsletters.Data.Entities;
using FamilyNewsletters.Models;

namespace FamilyNewsletters.Data.Mappings
{
    public class ContactProfile : Profile
    {
        public ContactProfile()
        {
            CreateMap<Contact, Contacts>();
            CreateMap<Contacts, Contact>();
        }
    }
}