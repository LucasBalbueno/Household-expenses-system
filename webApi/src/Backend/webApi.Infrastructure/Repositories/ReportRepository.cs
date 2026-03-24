using Microsoft.EntityFrameworkCore;
using webApi.Domain.Entities;
using webApi.Domain.Repositories;
using webApi.Infrastructure.Data;

namespace webApi.Infrastructure.Repositories;

public class ReportRepository: IReportRepository
{
    // Arquivo responsável por fazer todas as queries com o banco de dados (EntityFramework Core)
    
    // Dependency Injection com a conexão do DB
    private readonly AppDbContext _dbContext;

    // Configuração do construtor repository e vinculo com DB context
    // Esse vínculo pode ser o DB normal ou o de testes
    public ReportRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // READ: Retorna o total de transações por pessoa
    public async Task<IEnumerable<Person>> GetAllTransactionsByPersonAsync()
    {
        // AsNoTracking(): Desliga o rastreamento de mudanças (deixa mais rápido quando a ideia é apenas consultar)
        // Include(): Carrega de forma otimizada entidades relacionadas (como tabelas estrangeira)
        // OrderBy(): Ordena a busca pelo nome
        // ToListAsync(): Faz a busca no banco de dados
        return await _dbContext.People.AsNoTracking().Include(p => p.Transactions).OrderBy(p => p.Name).ToListAsync();
    }

    // READ: Retorna o total de transações por categoria
    public async Task<IEnumerable<Category>> GetAllTransactionsByCategoryAsync()
    {
        return await _dbContext.Categories.AsNoTracking().Include(c => c.Transactions).OrderBy(c => c.Description).ToListAsync();
    }
}