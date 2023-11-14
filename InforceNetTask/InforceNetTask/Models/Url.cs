using System.ComponentModel.DataAnnotations;

namespace InforceNetTask.Models
{
  public class Url
  {
    [Key]
    public int Id { get; set; }
    public string longUrl { get; set; }
    public string shortUrl { get; set; }
    public string createdBy { get; set; }
    public DateTime createdDate { get; set; }

  }
}
