using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserRegistrationDto
    {
        [Required(ErrorMessage="User name is required.")]
        public string username { get; set; }

        [Required]
        [StringLength(16, MinimumLength=4, ErrorMessage="Minimum length is 4 max is 16")]
        public string password { get; set; }
    }
}