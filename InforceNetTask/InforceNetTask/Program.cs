using InforceNetTask.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRazorPages();

builder.Services.AddDbContext<AppDBContext>(options =>
{
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultString"));
});

builder.Services.AddAuthentication(x =>
{
  x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
  x.RequireHttpsMetadata = false;
  x.SaveToken = true;
  x.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryverysceret.....")),
  };
});

builder.Services.AddCors(options =>
{
  options.AddPolicy("MyPolicy", builder => builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
      .AllowAnyMethod()
      .AllowAnyHeader()
      .AllowCredentials());
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapRazorPages();

app.UseCors("MyPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapRazorPages();

app.Run();
