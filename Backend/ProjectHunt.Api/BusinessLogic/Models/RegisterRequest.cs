using System.ComponentModel.DataAnnotations;

namespace ProjectHunt.Api.BusinessLogic.Models
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Email должен быть указан")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Пароль должен быть указан")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Подтверждение пароля должно быть указано")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Пароли не совпали")]
        public string PasswordConfirm { get; set; }

        [Required(ErrorMessage = "Имя должно быть указано")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Фамилия должна быть указана")]
        public string SecondName { get; set; }
    }
}
