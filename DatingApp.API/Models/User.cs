namespace DatingApp.API.Models
{
    public class User
    {
        
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PaswordHash { get; set; }
        public byte[] PaswordSalt { get; set; }


    }
}