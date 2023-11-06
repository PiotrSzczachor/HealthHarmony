namespace HealthHarmony.Auth.DTOs.User
{
    public class UserRegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime BirthDate { get; set; }
        public string Pesel {  get; set; }
        public string PhoneNumber { get; set; }
    }
}
