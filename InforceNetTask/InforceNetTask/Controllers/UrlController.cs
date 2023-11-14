using InforceNetTask.Context;
using InforceNetTask.Models;
using InforceNetTask.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InforceNetTask.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UrlController : ControllerBase
  {
    private readonly AppDBContext _dbContext;
    
    public UrlController(AppDBContext dBContext)
    {
        this._dbContext = dBContext;
    }

    [HttpPost("{username}/shorturl")]
    public async Task<IActionResult> shortenUrl([FromBody] UrlDTO urlObj, [FromRoute] string username)
    {

      var urlList = await _dbContext.Urls.ToListAsync();
      bool isInList = urlList.Any(x=>x.longUrl==urlObj.Url);
      if(isInList)
      {
        return BadRequest(new {
          Message = "Url already exists"
        });
      }
      UrlsService urlsService =  new UrlsService();
      var result = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/{urlsService.shortUrl()}";

      var sUrl = new Url()
      {
        longUrl = urlObj.Url,
        shortUrl = result,
        createdBy = username
      };

      await _dbContext.Urls.AddAsync(sUrl);
      await _dbContext.SaveChangesAsync();

      return Ok(new UrlResponseDTO
      {
        Url = result
      });
    }

    [HttpGet("/{shortUrl}")]
    public async Task<IActionResult> redirectToUrl([FromRoute] string shortUrl)
    {
      var path = Request.GetDisplayUrl();
      var urlMatch = await _dbContext.Urls.FirstOrDefaultAsync(x => x.shortUrl == path);
      return Redirect(urlMatch.longUrl);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUrls()
    {
      return Ok(await _dbContext.Urls.ToListAsync());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var urlToDelete = await _dbContext.Urls.FirstOrDefaultAsync(x => x.Id == id);
      if(urlToDelete != null)
      {
        _dbContext.Urls.Remove(urlToDelete);
        await _dbContext.SaveChangesAsync();
        return Ok(urlToDelete);
      }
      return null;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      var url = await _dbContext.Urls.FirstOrDefaultAsync(x => x.Id == id);
      if (url != null)
      {
        return Ok(url);
      }
      return null;
    }
  }
}
