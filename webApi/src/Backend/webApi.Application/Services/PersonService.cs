using webApi.Communication.Requests;
using webApi.Communication.Responses;
using webApi.Domain.Entities;
using webApi.Domain.Repositories;
using webApi.Exceptions;

namespace webApi.Application.Services;

public class PersonService
{
    // Camada Service de Pessoas, aqui ficará todas as regras de negócios e fará chamadas para os repositories de Infrastructure (Consultas do banco)
    
    // Depedency Injection dos repositories Pessoa e Transações
    private readonly IPersonRepository _personRepository;
    private readonly ITransactionRepository _transactionRepository;

    // Configurando o construtor da classe e vinculando o repository de Pessoa e Transação
    public PersonService(IPersonRepository personRepository, ITransactionRepository transactionRepository)
    {
        _personRepository = personRepository;
        _transactionRepository = transactionRepository;
    }
    
    // Serviço de buscar todas as pessoas
    public async Task<IEnumerable<PersonResponse>> GetAllPeopleAsync()
    {
        // Chama a função no repository (Infrastructure) que faz a busca no DB
        var people = await _personRepository.GetAllAsync();

        // Converte os dados retornados da busca no objeto PersonResponse (Response padrão configurada)
        // Select(): Método LINQ que itera os dados de uma coleção (necessário por retorna uma lista de pessoas)
        return people.Select(p => new PersonResponse
        {
            Id = p.Id,
            Name = p.Name,
            Age = p.Age
        });
    }

    // Serviço para buscar pessoa por ID
    public async Task<PersonResponse> GetPersonByIdAsync(Guid id)
    {
        // Chama a função no repository (Infrastructure) que faz a busca no DB
        // Com uma condicional, se for null lançará uma exceção padronizada de webApi.Exceptions
        var person = await _personRepository.GetByIdAsync(id) ?? throw new NotFoundException("Pessoa não encontrada.");

        // Converte os dados retornados da busca no objeto PersonResponse (Response padrão configurada)
        return new PersonResponse
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.Age
        };
    }

    public async Task<PersonResponse> CreatePersonAsync(PersonRequest request)
    {
        // Chama função de validar dados de entrada
        ValidateData(request);

        // Cria um objeto Person com os dados de entrada
        var person = new Person
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Age = request.Age
        };

        // Chama a função no repository (Infrastructure) que cria a Pessoa no DB
        await _personRepository.CreateAsync(person);
        // Chama a função no repository (Infrastructure) para salvar as alterações do DB
        await _personRepository.SaveChangesAsync();

        // Converte os dados retornados da busca no objeto PersonResponse (Response padrão configurada)
        return new PersonResponse
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.Age
        };
    }

    public async Task<PersonResponse> UpdatePersonAsync(Guid id, PersonRequest request)
    {
        // Chama a função no repository (Infrastructure) que faz a busca no DB
        // Com uma condicional, se for null lançará uma exceção padronizada de webApi.Exceptions
        var person = await _personRepository.GetByIdAsync(id) ?? throw new NotFoundException("Pessoa não encontrada.");
        
        // Chama função de validar dados de entrada
        ValidateData(request);

        // Atualiza os dados da pessoa encontrada no Banco com os dados de entrada
        person.Name = request.Name.Trim();
        person.Age = request.Age;
        
        // Chama a função no repository (Infrastructure) que atualiza a pessoa no DB
        _personRepository.Update(person);
        // Chama a função no repository (Infrastructure) para salvar as alterações do DB
        await _personRepository.SaveChangesAsync();

        // Converte os dados retornados da busca no objeto PersonResponse (Response padrão configurada)
        return new PersonResponse
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.Age
        };
    }

    public async Task DeletePersonAsync(Guid id)
    {
        // Chama a função no repository (Infrastructure) que faz a busca no DB
        // Com uma condicional, se for null lançará uma exceção padronizada de webApi.Exceptions
        var person = await _personRepository.GetByIdAsync(id) ?? throw new NotFoundException("Pessoa não encontrada.");
        
        // Deleta as transações vinculadas a essa pessoa
        await _transactionRepository.DeleteByPersonIdAsync(person.Id);

        // Chama a função no repository (Infrastructure) que deleta a pessoa no DB
        _personRepository.Delete(person);
        // Chama a função no repository (Infrastructure) para salvar as alterações do DB
        await _personRepository.SaveChangesAsync();
    }

    // Função para validar dados de entrada do Body para criar uma pessoa
    private static void ValidateData(PersonRequest request)
    {
        // Valida se nome é vazio
        if (string.IsNullOrWhiteSpace(request.Name))
            throw new ValidationException("O campo nome é obrigatório.");
        
        // Valida o tamanho de nome
        if (request.Name.Length > 200)
            throw new ValidationException("O nome não pode ter mais que 200 caracteres.");
        
        // Valida se idade é menor ou igual a 0
        if (request.Age <= 0)
            throw new ValidationException("A idade deve ser superior a zero.");
    }
}