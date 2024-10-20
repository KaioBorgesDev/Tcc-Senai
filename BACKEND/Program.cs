using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Adiciona o servi�o de autentica��o � aplica��o, especificando que usaremos JWT (JSON Web Tokens) para autentica��o.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

// Configura as op��es para o uso de tokens JWT
.AddJwtBearer(options =>
{
    // Define as regras para validar o token que ser� recebido
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // Verifica se o emissor do token � v�lido (se � realmente de quem diz ser)
        ValidateIssuer = true,

        // Verifica se o p�blico do token � v�lido (se foi gerado para a aplica��o que est� recebendo)
        ValidateAudience = true,

        // Verifica se o token ainda est� v�lido (ou seja, n�o expirou)
        ValidateLifetime = true,

        // Especifica o emissor v�lido que os tokens devem ter (definido nas configura��es da aplica��o)
        ValidIssuer = builder.Configuration["Jwt:Issuer"],

        // Especifica o p�blico v�lido que os tokens devem ter (tamb�m definido nas configura��es)
        ValidAudience = builder.Configuration["Jwt:Audience"],

        // Define a chave que foi usada para assinar o token (para garantir que ele � aut�ntico)
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
