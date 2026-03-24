using Microsoft.EntityFrameworkCore;
using webApi.Domain.Entities;
using webApi.Domain.Repositories;
using webApi.Infrastructure.Data;

namespace webApi.Infrastructure.Repositories;

public class TransactionRepository: ITransactionRepository
{
    // Arquivo responsável por fazer todas as queries com o banco de dados (EntityFramework Core)
    
    // Dependency Injection com a conexão do DB
    private readonly AppDbContext _dbContext;

    // Configuração do construtor repository e vinculo com DB context
    // Esse vínculo pode ser o DB normal ou o de testes
    public TransactionRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    // READ: Retorna todas as transações
    public async Task<IEnumerable<Transaction>> GetAllAsync()
    {
        // AsNoTracking(): Desliga o rastreamento de mudanças (deixa mais rápido quando a ideia é apenas consultar)
        // Include(): Carrega de forma otimizada entidades relacionadas (como tabelas estrangeira)
        // OrderBy(): Ordena a busca pelo nome
        // ToListAsync(): Faz a busca no banco de dados e armazena numa lista
        return await _dbContext.Transactions
            .AsNoTracking()
            .Include(t => t.Person)
            .Include(t => t.Category)
            .OrderByDescending(t => t.Id)
            .ToListAsync();
    }
    
    // READ: Retorna uma transação pelo Id
    public async Task<Transaction> GetByIdAsync(Guid id)
    {
        // Include(): Carrega de forma otimizada entidades relacionadas (como tabelas estrangeira)
        // FirstOrDefaultAsync(): Faz a busca de acordo com a condicional passada e retorna o primeiro resultado.
        return await _dbContext.Transactions
            .Include(t => t.Person)
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    // CREATE: Adiciona uma nova transação
    public async Task CreateAsync(Transaction transaction)
    {
        //AddAsync(): Adiciona um objeto no banco
        await _dbContext.Transactions.AddAsync(transaction);
    }
    
    // DELETE: Deleta transação quando a pessoa vinculada é deletada
    public async Task DeleteByPersonIdAsync(Guid personId)
    {
        // Where(): Filtra a busca do banco de acordo com a condição passada
        // ToListAsync(): Faz a busca no banco de dados e armazena numa lista
        var transactions = await _dbContext.Transactions
            .Where(t => t.PersonId == personId)
            .ToListAsync();
        
        // RemoveRange(): Deleta multiplos elementos do banco
        _dbContext.Transactions.RemoveRange(transactions);
    }
    
    // Salva as alterações no Banco
    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}