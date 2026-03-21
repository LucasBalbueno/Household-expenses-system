using webApi.Domain.Entities;

namespace webApi.Domain.Repositories;

public interface IPersonRepository
{ 
    // Contrato de operações CRUD da entidade Person
    // Task para representar assincronismo
    // IEnumerable para retornar uma coleção de pessoas, podendo ser uma lista ou outro tipo de coleção
    
    // READ: Retorna todas as pessoas
    Task<IEnumerable<Person>> GetAllAsync();
    
    // READ: Retorna uma pessoa pelo ID
    Task<Person> GetByIdAsync(Guid id);
    
    // CREATE: Adiciona uma nova pessoa
    Task CreateAsync(Person person);
    
    // UPDATE: Atualiza uma pessoa existente
    void Update(Guid id, Person person);
    
     // DELETE: Remove uma pessoa pelo ID
     void Delete(Guid id);
}