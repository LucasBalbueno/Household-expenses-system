using webApi.Domain.Entities;

namespace webApi.Domain.Repositories;

public interface ICategoryRepository
{
    // Contrato de operações CRUD da entidade Category
    
    // READ: Retorna todas as categorias
    Task<IEnumerable<Category>> GetAllAsync();

    // READ: Retorna uma categoria pelo ID
    Task<Category> GetByIdAsync(Guid id);

    // CREATE: Adiciona uma nova categoria
    Task CreateAsync(Category category);
}