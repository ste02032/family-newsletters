using FamilyNewsletters.Logic;
using FamilyNewsletters.Models;
using Microsoft.AspNetCore.Mvc;

namespace FamilyNewsletters.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ILogger<ContactController> _logger;
        private readonly IContactService _contactService;

        public ContactController(ILogger<ContactController> logger, IContactService contactService)
        {
            _logger = logger;
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] bool? isActive = null)
        {
            var contacts = await _contactService.List(isActive);
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var contact = await _contactService.Get(id);
            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }

            return Ok(await _contactService.Add(contact));
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }

            var contactUpdated = await _contactService.Update(id, contact);
            if (contactUpdated == null)
            {
                return NotFound();
            }

            return Ok(contactUpdated);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!await _contactService.Delete(id))
            {
                return NotFound();
            }

            return Ok(new
            {
                message = "Contact deleted successfully",
                id = id
            });
        }
    }
}
