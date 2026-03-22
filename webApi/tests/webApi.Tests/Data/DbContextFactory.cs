using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using webApi.Infrastructure.Data;

namespace webApi.Tests.Data;

public class DbContextFactory
{
    // Cria uma instância nova de AppDbContext em memória isolada apenas para testes
    // Cada teste recebe um banco único (nomeado com Guid)

    // Função de criar contexto DB (será utilizada nos testes)
    public static AppDbContext CreateDbContext()
    {
        // Configuração do EntityFramework Core + Banco InMemory
        var options =
            new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

        return new AppDbContext(options);
    }
}