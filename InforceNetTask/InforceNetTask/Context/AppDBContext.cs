using InforceNetTask.Models;
using Microsoft.EntityFrameworkCore;

namespace InforceNetTask.Context
{
  public class AppDBContext: DbContext
  {
    public DbSet<User> Users { get; set; }
    public DbSet<Url> Urls { get; set; }
    public AppDBContext(DbContextOptions<AppDBContext> options):base(options)
    {
        
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<User>().ToTable("users");
      modelBuilder.Entity<Url>()
        .Property(b => b.createdDate)
        .HasDefaultValueSql("getdate()");
      modelBuilder.Entity<Url>().ToTable("urls");
    }
  }
}
