using webApi.Domain.Entities;

namespace webApi.Domain.Repositories;

public interface ITransactionRepository
{
    // Contrato de operações CRUD da entidade Transaction
    
    // READ: Retorna todas as transações
    Task<IEnumerable<Transaction>> GetAllAsync();
    
    // READ: Retorna uma transação pelo ID
    Task<Transaction> GetByIdAsync(Guid id);

    // CREATE: Adiciona uma nova transação
    Task CreateAsync(Transaction transaction);
    
    // DELETE: Deleta transação quando a pessoa vinculada é deletada
    Task DeleteByPersonIdAsync(Guid personId);
    
    // Salva as alterações no Banco
    Task SaveChangesAsync();
}