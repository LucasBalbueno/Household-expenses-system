using Microsoft.EntityFrameworkCore;
using webApi.Application.Services;
using webApi.Domain.Repositories;
using webApi.Exceptions;
using webApi.Infrastructure.Data;
using webApi.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configuração do DB (DbContext + SQlite)
// Arquivo .db é criado no projeto webApi.API
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=app.db";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));


// Configuração de dependency injection entre interfaces e repository
builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();


// Configuração de Services da aplicação
builder.Services.AddScoped<PersonService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<TransactionService>();


// Configuração de exceptions entre as controllers da aplicação
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ExceptionFilter>();
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "API de Controle de Gastos Residenciais",
        Version = "v1",
        Description = "Sistema para gerenciamento de despesas residenciais."
    });
});

var app = builder.Build();

// Cria/Atualiza o arquivo .db do SQLite automaticamente ao iniciar o app
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();