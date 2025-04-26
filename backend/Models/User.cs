namespace ExpenseTracker.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = "";

        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        public List<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
