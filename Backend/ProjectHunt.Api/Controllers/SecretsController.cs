using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using ProjectHunt.Api.BusinessLogic.Models;
using ProjectHunt.Api.BusinessLogic.Services.Secrets;

namespace ProjectHunt.Api.Controllers
{
    [ApiController]
    [Route("secrets")]
    public class SecretsController : ControllerBase
    {
        private ISecretService SecretService { get; }

        public SecretsController(ISecretService secretService)
        {
            this.SecretService = secretService ?? throw new ArgumentNullException(nameof(secretService));
        }

        [HttpGet]
        [Route("isAdmin")]
        public IActionResult IsAdmin()
        {
            var userId = this.User.Claims.First().Value;
            var isAdmin = SecretService.IsAdmin(userId);
            return new ObjectResult(isAdmin) {StatusCode = 200};
        }

        [HttpPost]
        [Route("login")]
        public IActionResult AuthorizeUser([FromBody, Required(ErrorMessage = "Тело запроса не должно быть пустым")] LoginRequest request)
        {
            var authorizeResult = SecretService.AuthorizeUser(request);
            Authenticate(authorizeResult.UserId, authorizeResult.IsAdmin);
            authorizeResult.Password = "";
            return new ObjectResult(authorizeResult) { StatusCode = 200 };
        }

        [HttpPost]
        [Route("create")]
        public IActionResult CreateUser([FromBody, Required(ErrorMessage = "Тело запроса не должно быть пустым")] RegisterRequest request)
        {
            var userId = SecretService.CreateUser(request);
            Authenticate(userId.ToString(), false);
            return new ObjectResult(userId) { StatusCode = 201 };
        }

        [HttpPost]
        [Route("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return new ObjectResult(new ProjectHuntResponse()) {StatusCode = 200};
        }

        private void Authenticate(string userName, bool isAdmin)
        {
            var role = Role.User;
            if (isAdmin)
            {
                role = Role.Admin;
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, role)
            };

            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}
