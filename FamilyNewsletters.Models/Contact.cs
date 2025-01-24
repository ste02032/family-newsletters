namespace FamilyNewsletters.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public DateTime Birthday { get; set; }
        public bool IsContributor { get; set; }
        public bool IsRecipient { get; set; }
        public bool Administrator { get; set; }
        public bool IsActive { get; set; }
    }
}
