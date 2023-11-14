using InforceNetTask.Context;
using InforceNetTask.Models;

namespace InforceNetTask.Services
{
  public class UrlsService
  {

    public AppDBContext _dbContext;

    public UrlsService()
    {
    }

    public string shortUrl()
    {
      var rand = new Random();
      const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      var randStr = new string(Enumerable.Repeat(chars, 8)
        .Select(x => x[rand.Next(x.Length)]).ToArray());
      return randStr;
    }

  }
}
