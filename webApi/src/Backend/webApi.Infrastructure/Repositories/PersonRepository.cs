using Microsoft.EntityFrameworkCore;
using webApi.Domain.Entities;
using webApi.Domain.Repositories;
using webApi.Infrastructure.Data;

namespace webApi.Infrastructure.Repositories;

public class PersonRepository: IPersonRepository
{
    // Arquivo responsável por fazer todas as queries com o banco de dados (EntityFramework Core)
    
    // Dependency Injection com a conexão do DB
    private readonly AppDbContext _dbContext;

    // Configuração do construtor repository e vinculo com DB context
    public PersonRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    // READ: Retorna todas as pessoas
    public async Task<IEnumerable<Person>> GetAllAsync()
    {
        // AsNoTracking(): Desliga o rastreamento de mudanças (deixa mais rápido quando a ideia é apenas consultar)
        // OrderBy(): Ordena a busca pelo nome
        // ToListAsync(): Faz a busca no banco de dados
        return await _dbContext.People.AsNoTracking().OrderBy(p => p.Name).ToListAsync();
    }
    
    // READ: Retorna uma pessoa pelo ID
    public async Task<Person> GetByIdAsync(Guid id)
    {
        // AsNoTracking(): Desliga o rastreamento de mudanças (deixa mais rápido quando a ideia é apenas consultar)
        // FirstOrDefaultAsync(): Faz a busca e retorna o primeiro resultado passado como parâmetro
        return await _dbContext.People.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
    }
    
    // CREATE: Adiciona uma nova pessoa
    public async Task CreateAsync(Person person)
    {
        //AddAsync(): Adiciona um objeto no banco
        await _dbContext.People.AddAsync(person);
    }
    
    // UPDATE: Atualiza uma pessoa existente
    public void Update(Person person)
    {
        //Update(): Atualiza um objeto no banco
        _dbContext.People.Update(person);
    }
    
    // DELETE: Remove uma pessoa pelo ID
    public void Delete(Person person)
    {
        //Remove(): Remove um objeto no banco
        _dbContext.People.Remove(person);
    }

    // Salva as alterações no Banco
    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}