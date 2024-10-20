using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Adiciona o serviço de autenticação à aplicação, especificando que usaremos JWT (JSON Web Tokens) para autenticação.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

// Configura as opções para o uso de tokens JWT
.AddJwtBearer(options =>
{
    // Define as regras para validar o token que será recebido
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // Verifica se o emissor do token é válido (se é realmente de quem diz ser)
        ValidateIssuer = true,

        // Verifica se o público do token é válido (se foi gerado para a aplicação que está recebendo)
        ValidateAudience = true,

        // Verifica se o token ainda está válido (ou seja, não expirou)
        ValidateLifetime = true,

        // Especifica o emissor válido que os tokens devem ter (definido nas configurações da aplicação)
        ValidIssuer = builder.Configuration["Jwt:Issuer"],

        // Especifica o público válido que os tokens devem ter (também definido nas configurações)
        ValidAudience = builder.Configuration["Jwt:Audience"],

        // Define a chave que foi usada para assinar o token (para garantir que ele é autêntico)
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();

    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowSpecificOrigin");
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
