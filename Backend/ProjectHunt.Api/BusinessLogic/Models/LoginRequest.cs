using System.ComponentModel.DataAnnotations;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Логин должен быть указан")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Пароль должен быть указан")]
        public string Password { get; set; }
    }
}
