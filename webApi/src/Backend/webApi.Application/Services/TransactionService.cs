using webApi.Communication.Requests;
using webApi.Communication.Responses;
using webApi.Domain.Entities;
using webApi.Domain.Enums;
using webApi.Domain.Repositories;
using webApi.Exceptions;

namespace webApi.Application.Services;

public class TransactionService
{
    // Camada Service de Transações, aqui ficará todas as regras de negócios e fará chamadas para os repositories de Infrastructure (Consultas do banco)
    
    // Depedency Injection dos repositories Transação, Pessoa e Categoria
    private readonly ITransactionRepository _transactionRepository;
    private readonly IPersonRepository _personRepository;
    private readonly ICategoryRepository _categoryRepository;
    
    // Configurando o construtor da classe e vinculando os repositories
    public TransactionService(ITransactionRepository transactionRepository, IPersonRepository personRepository, ICategoryRepository categoryRepository)
    {
        _transactionRepository = transactionRepository;
        _personRepository = personRepository;
        _categoryRepository = categoryRepository;
    }

    // Serviço de buscar todas as transações
    public async Task<IEnumerable<TransactionResponse>> GetAllTransactionAsync()
    {
        // Chama a função no repository (Infrastructure) que faz a busca no DB
        var transactions = await _transactionRepository.GetAllAsync();

        // Converte os dados retornados da busca no objeto TransactionResponse (Response padrão configurada)
        // Select(): Método LINQ que itera os dados de uma coleção (necessário por retorna uma lista de transações)
        return transactions.Select(t => new TransactionResponse
        {
            Id = t.Id,
            Description = t.Description,
            Amount = t.Amount,
            TypeTransaction = t.Type.ToString(),
            CategoryDescription = t.Category.Description,
            PersonName = t.Person.Name,
        });
    }

    // Serviço para buscar transação por ID
    public async Task<TransactionResponse> GetTransactionByIdAsync(Guid id)
    {
        // Chama a função no repository (Infrastructure) que faz a busca no DB
        // Com uma condicional, se for null lançará uma exceção padronizada de webApi.Exceptions
        var transaction = await _transactionRepository.GetByIdAsync(id) ?? throw new NotFoundException("Transação não encontrada.");

        // Converte os dados retornados da busca no objeto TransactionResponse (Response padrão configurada)
        return new TransactionResponse
        {
            Id = transaction.Id,
            Description = transaction.Description,
            Amount = transaction.Amount,
            TypeTransaction = transaction.Type.ToString(),
            CategoryDescription = transaction.Category.Description,
            PersonName = transaction.Person.Name,
        };
    }

    // Serviço de criar transação
    public async Task<TransactionResponse> CreateTransactionAsync(TransactionRequest request)
    {
        // Chama função de validar dados de entrada
        ValidateData(request);
        
        // Validação de existência da Pessoa
        var person = await _personRepository.GetByIdAsync(request.PersonId)
                     ?? throw new NotFoundException("Pessoa não encontrada.");

        // Validação de existência da Categoria
        var category = await _categoryRepository.GetByIdAsync(request.CategoryId)
                       ?? throw new NotFoundException("Categoria não encontrada.");

        // Validação se pessoa é menor de 18 anos (só pode registrar despesas)
        if (person.Age < 18 && request.TypeTransaction == TypeTransaction.Receita)
            throw new ValidationException("Menores de 18 anos só podem registrar despesas.");
        
        // Verifica se Finalidade é diferente de Ambas. Se for Ambas a categoria pode ser de qualquer tipo de transação (Depesa ou Receita).
        if (category.Purpose != Purpose.Ambas)
        {
            // Define a Finalidade esperada. Se o tipo for Despesa, a finalidade esperada será Purpose.Despesa. Caso contrário, será Purpose.Receita.
            var expectedPurpose = request.TypeTransaction == TypeTransaction.Despesa
                ? Purpose.Despesa
                : Purpose.Receita;

            // Verifica se a finalidade da categoria (category.Purpose) é diferente da finalidade esperada (expectedPurpose). Se for lança uma exceção.
            if (category.Purpose != expectedPurpose)
                throw new ValidationException(
                    $"A categoria '{category.Description}' tem finalidade '{category.Purpose}' e não pode ser usada para transações do tipo '{request.TypeTransaction}'.");
        }
        
        // Cria um objeto Transaction com os dados de entrada
        var transaction = new Transaction
        {
            Id = Guid.NewGuid(),
            Description = request.Description.Trim(),
            Amount = request.Amount,
            Type = request.TypeTransaction,
            CategoryId = request.CategoryId,
            PersonId = request.PersonId
        };

        // Chama a função no repository (Infrastructure) que cria a transação no DB
        await _transactionRepository.CreateAsync(transaction);
        // Chama a função no repository (Infrastructure) para salvar as alterações do DB
        await _transactionRepository.SaveChangesAsync();

        // Converte os dados retornados da busca no objeto TransactionResponse (Response padrão configurada)
        return new TransactionResponse
        {
            Id = transaction.Id,
            Description = transaction.Description,
            Amount = transaction.Amount,
            TypeTransaction = transaction.Type.ToString(),
            CategoryDescription = category.Description,
            PersonName = person.Name
        };
    }

    // Função de validar dados de entrada
    private static void ValidateData(TransactionRequest request)
    {
        // Valida se descrição é vazio
        if (string.IsNullOrWhiteSpace(request.Description))
            throw new ValidationException("O campo descrição é obrigatório.");

        // Valida o tamanho da descrição
        if (request.Description.Length > 400)
            throw new ValidationException("A descrição não pode ter mais que 400 caracteres.");

        // Valida se o valor é menor ou igual a 0
        if (request.Amount <= 0)
            throw new ValidationException("O valor deve ser um número positivo.");

        // Valida se o Tipo da transação estão corretos
        if (!Enum.IsDefined(request.TypeTransaction))
            throw new ValidationException("O tipo de transação é inválido. Use: 1 (Despesa) ou 2 (Receita).");
    }
}