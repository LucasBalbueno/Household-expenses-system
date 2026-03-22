using Microsoft.EntityFrameworkCore;
using webApi.Domain.Entities;
using webApi.Domain.Repositories;
using webApi.Infrastructure.Data;

namespace webApi.Infrastructure.Repositories;

public class CategoryRepository: ICategoryRepository
{
    // Arquivo responsável por fazer todas as queries com o banco de dados (EntityFramework Core)
    
    // Dependency Injection com a conexão do DB
    private readonly AppDbContext _dbContext;

    // Configuração do construtor repository e vinculo com DB context
    // Esse vínculo pode ser o DB normal ou o de testes
    public CategoryRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    // READ: Retorna todas as categorias
    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        // AsNoTracking(): Desliga o rastreamento de mudanças (deixa mais rápido quando a ideia é apenas consultar)
        // OrderBy(): Ordena a busca pelo nome
        // ToListAsync(): Faz a busca no banco de dados
        return await _dbContext.Categories.AsNoTracking().OrderBy(c => c.Description).ToListAsync();
    }

    // READ: Retorna uma categoria pelo ID
    public async Task<Category> GetByIdAsync(Guid id)
    {
        // FindAsync(): Método otimizado para buscar chaves primárias. Se a entidade (id) já foi carregada antes não precisa fazer a querie no banco
        // Substitui AsNoTracking() e FirstOrDefaultAsync() que realiza apenas a leitura direto no banco.
        return await _dbContext.Categories.FindAsync(id);
    }

    // CREATE: Adiciona uma nova categoria
    public async Task CreateAsync(Category category)
    {
        //AddAsync(): Adiciona um objeto no banco
        await _dbContext.Categories.AddAsync(category);
    }
    
    // Salva as alterações no Banco
    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}