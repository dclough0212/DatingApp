using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
  public class AuthRepository : IAuthRepository
  {

    private DataContext _context;

    public AuthRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<User> Login(string username, string password)
    {
      var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

      if (user == null)
        return null;

      if (!verifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
        return null;  

      return user;
    }

    private bool verifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using (var hma = new System.Security.Cryptography.HMACSHA512(passwordSalt))
        {
          var calcHash = hma.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

          for (int i = 0; i < calcHash.Length; i++){
            if (passwordHash[i] != calcHash[i])
              return false;
          }
        }

        return true;
    }

    public async Task<User> Register(User user, string password)
    {
        CreatePasswordHash(password, 
      out byte[] passwordKey, 
      out byte[] passwordHash);

      user.PasswordSalt = passwordKey;
      user.PasswordHash = passwordHash;
      
      await _context.Users.AddAsync(user);
      await _context.SaveChangesAsync();

      return user;

    }

    public async Task<bool> UserExists(string username)
    {
         return await _context.Users.FirstOrDefaultAsync(x => x.Username == username) != null;
    }

    private void CreatePasswordHash(string password, 
      out byte[] passwordKey, 
      out byte[] passwordHash) {

        using (var hma = new System.Security.Cryptography.HMACSHA512())
        {
          passwordKey = hma.Key;
          passwordHash = hma.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

    }
  }
}