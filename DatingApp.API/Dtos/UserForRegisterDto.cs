using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4 , ErrorMessage = "You Must specify password between 4 or 8 Characters")]
        public string Password { get; set; }
    }
}