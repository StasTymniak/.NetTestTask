using InforceNetTask.Context;
using InforceNetTask.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace InforceNetTask.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly AppDBContext _dbContext;

    public UserController(AppDBContext dBContext)
    {
      this._dbContext = dBContext;
    }

    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] User userObj)
    {
      if (userObj == null)
        return BadRequest();

      var user = await _dbContext.Users
          .FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password == userObj.Password);

      if (user == null)
        return NotFound(new { Message = "User not found!" });

      user.Token = CreateJwt(user);
      return Ok(new
      {
        Token = user.Token,
        Message = $"Login success "
      });
    }

    [HttpPost("register")]
    public async Task<IActionResult> AddUser([FromBody] User userObj)
    {
      if (userObj == null)
        return BadRequest();

      await _dbContext.AddAsync(userObj);
      await _dbContext.SaveChangesAsync();
      return Ok(new
      {
        Status = 200,
        Message = "User Added!"
      });
    }

    //JwT
    private string CreateJwt(User user)
    {
      var jwtTokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes("veryverysceret.....");
      var identity = new ClaimsIdentity(new Claim[]
      {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name,$"{user.Username}")
      });

      var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = identity,
        Expires = DateTime.Now.AddSeconds(10),
        SigningCredentials = credentials
      };
      var token = jwtTokenHandler.CreateToken(tokenDescriptor);
      return jwtTokenHandler.WriteToken(token);
    }


  }
}
