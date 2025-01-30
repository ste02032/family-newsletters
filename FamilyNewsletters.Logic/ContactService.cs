using AutoMapper;
using FamilyNewsletters.Data.Context;
using FamilyNewsletters.Data.Entities;
using FamilyNewsletters.Models;
using Microsoft.EntityFrameworkCore;

namespace FamilyNewsletters.Logic
{
    public interface IContactService
    {
        Task<List<Contact>> List(bool? isActive);
        Task<Contact?> Get(int id);
        Task<Contact?> Add(Contact obj);
        Task<Contact?> Update(int id, Contact obj);
        Task<bool> Delete(int contactId);
    }

    public class ContactService : IContactService
    {
        private readonly ContactDbContext _db;
        private readonly IMapper _mapper;
        public ContactService(ContactDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<List<Contact>> List(bool? isActive)
        {
            if (isActive == null) {
                return _mapper.Map<List<Contact>>(await _db.Contacts.ToListAsync());
            }

            return _mapper.Map<List<Contact>>(await _db.Contacts.Where(obj => obj.IsActive == isActive).ToListAsync());
        }

        public async Task<Contact?> Get(int id)
        {
            return _mapper.Map<Contact>(await _db.Contacts.FirstOrDefaultAsync(x => x.Id == id));
        }

        public async Task<Contact?> Add(Contact obj)
        {
            var contact = new Contacts()
            {
                FirstName = obj.FirstName,
                LastName = obj.LastName,
                IsActive = obj.IsActive,
                Administrator = obj.Administrator,
                Birthday = obj.Birthday,
                EmailAddress = obj.EmailAddress,
                IsContributor = obj.IsContributor,
                IsRecipient = obj.IsRecipient
            };

            _db.Contacts.Add(contact);
            var result = await _db.SaveChangesAsync();
            return result >= 0 ? _mapper.Map<Contact>(contact) : null;
        }

        public async Task<Contact?> Update(int id, Contact obj)
        {
            var contact = await _db.Contacts.FirstOrDefaultAsync(index => index.Id == id);
            if (contact != null)
            {
                contact.FirstName = obj.FirstName;
                contact.LastName = obj.LastName;
                contact.IsActive = obj.IsActive;
                contact.Administrator = obj.Administrator;
                contact.Birthday = obj.Birthday;
                contact.EmailAddress = obj.EmailAddress;
                contact.IsContributor = obj.IsContributor;
                contact.IsRecipient = obj.IsRecipient;

                var result = await _db.SaveChangesAsync();
                return result >= 0 ? _mapper.Map<Contact>(contact) : null;
            }
            return null;
        }

        public async Task<bool> Delete(int contactId)
        {
            var contact = await _db.Contacts.FirstOrDefaultAsync(index => index.Id == contactId);
            if (contact != null)
            {
                _db.Contacts.Remove(contact);
                var result = await _db.SaveChangesAsync();
                return result >= 0;
            }
            return false;
        }
    }
}
