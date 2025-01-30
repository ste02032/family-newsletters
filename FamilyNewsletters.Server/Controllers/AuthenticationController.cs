using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;

namespace FamilyNewsletters.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        [HttpGet("Login")]
        public async Task<IActionResult> Login()
        {
            string bearerToken = Request.Headers["Authorization"].ToString().Replace("Bearer", "", StringComparison.OrdinalIgnoreCase).Trim(); //remove Bearer 
            var payload = await VerifyGoogleTokenId(bearerToken);
            if (payload==null)
            {
                return BadRequest("Invalid token");
            }

            return Ok(payload);
        }

        private async Task<GoogleJsonWebSignature.Payload> VerifyGoogleTokenId(string token)
        {
            try
            {
                // uncomment these lines if you want to add settings: 
                // var validationSettings = new GoogleJsonWebSignature.ValidationSettings
                // { 
                //     Audience = new string[] { "yourServerClientIdFromGoogleConsole.apps.googleusercontent.com" }
                // };
                // Add your settings and then get the payload
                // GoogleJsonWebSignature.Payload payload =  await GoogleJsonWebSignature.ValidateAsync(token, validationSettings);

                // Or Get the payload without settings.
                GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(token);

                return payload;
            }
            catch (System.Exception)
            {
                Console.WriteLine("invalid google token");

            }
            return null;
        }
    }
}
