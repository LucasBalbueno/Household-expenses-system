using webApi.Application.Services;
using webApi.Communication.Requests;
using webApi.Domain.Enums;
using webApi.Exceptions;
using webApi.Infrastructure.Repositories;
using webApi.Tests.Data;

namespace webApi.Tests.Services;

public class TransactionServiceTests
{
    
    // Testes de Transação Service (lógica + regra de negócio)

    // Método auxiliar para criar uma instância de TransactionService, PersonService e CategoryService com o DB de testes configurado
    private static (TransactionService transactionService, PersonService personService, CategoryService categoryService) CreateServices()
    {
        var context = DbContextFactory.CreateDbContext();
        var transactionRepository = new TransactionRepository(context);
        var personRepository = new PersonRepository(context);
        var categoryRepository = new CategoryRepository(context);
        
        var transactionService = new TransactionService(transactionRepository, personRepository, categoryRepository);
        var personService = new PersonService(personRepository);
        var categoryService = new CategoryService(categoryRepository);

        return (transactionService, personService, categoryService);
    }
    
    // Teste de criação com dados válidos
    [Fact]
    public async Task CreateTransactionWithValidateData_ShouldReturnTransactionCreated()
    {
        // Chama a instância do service com DB test context
        var (transactionService, personService, categoryService) = CreateServices();

        // Cria uma pessoa, uma categoria e uma request (objeto com informações da transação)
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Mercado", Purpose = Purpose.Despesa });
        var request = new TransactionRequest{ Description = "Transação X", Amount = 500, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = TypeTransaction.Despesa};

        // Chama o service de criar transação passando a request
        var result = await transactionService.CreateTransactionAsync(request);
        
        // Testa se id não é vazio e se descrição, valor, nome da pessoa, descrição da categoria e tipo de transação estão corretos
        Assert.NotEqual(Guid.Empty, result.Id);
        Assert.Equal("Transação X", result.Description);
        Assert.Equal(500, result.Amount);
        Assert.Equal("Lucas Balbueno", result.PersonName);
        Assert.Equal("Mercado", result.CategoryDescription);
        Assert.Equal("Despesa", result.TypeTransaction);
    }
    
    // Teste de criação sem descrição
    [Fact]
    public async Task CreateTransactionWithEmptyDescription_ShouldReturnValidationException()
    {
        var (transactionService, personService, categoryService) = CreateServices();
        
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Mercado", Purpose = Purpose.Despesa });
        var request = new TransactionRequest{ Description = "", Amount = 500, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = TypeTransaction.Despesa};

        // Testa se uma exceção do tipo ValidationException foi lançada no service CreateTransactionAsync
        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => transactionService.CreateTransactionAsync(request));
        
        Assert.Equal("O campo descrição é obrigatório.", ex.Message);
    }
    
    // Teste de criação com descrição grande
    [Fact]
    public async Task CreateTransactionWithBigDescription_ShouldReturnValidationException()
    {
        var (transactionService, personService, categoryService) = CreateServices();

        var bigDescription = new string('A', 401);
        
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Mercado", Purpose = Purpose.Despesa });
        var request = new TransactionRequest{ Description = bigDescription, Amount = 500, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = TypeTransaction.Despesa};

        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => transactionService.CreateTransactionAsync(request));
        
        Assert.Equal("A descrição não pode ter mais que 400 caracteres.", ex.Message);
    }
    
    // Teste de criação com valor menor ou igual a zero
    [Fact]
    public async Task CreateTransactionWithAmountZero_ShouldReturnValidationException()
    {
        var (transactionService, personService, categoryService) = CreateServices();
        
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Mercado", Purpose = Purpose.Despesa });
        var request = new TransactionRequest{ Description = "Mercado", Amount = 0, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = TypeTransaction.Despesa};

        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => transactionService.CreateTransactionAsync(request));
        
        Assert.Equal("O valor deve ser um número positivo.", ex.Message);
    }
    
    // Teste de criação com tipo inválido (Ex: 3)
    [Fact]
    public async Task CreateTransactionWithIncorrectType_ShouldReturnValidationException()
    {
        var (transactionService, personService, categoryService) = CreateServices();
        
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Mercado", Purpose = Purpose.Despesa });
        var request = new TransactionRequest{ Description = "Lazer", Amount = 1500, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = (TypeTransaction)3};

        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => transactionService.CreateTransactionAsync(request));

        Assert.Equal("O tipo de transação é inválido. Use: 1 (Despesa) ou 2 (Receita).", ex.Message);
    }
    
    // Teste de criação categoria incompatível com tipo de transação
    [Fact]
    public async Task CreateTransactionWithCategoryPurposeIncompatibleWithType_ShouldReturnValidationException()
    {
        var (transactionService, personService, categoryService) = CreateServices();
            
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Trabalho", Purpose = Purpose.Receita });
        var request = new TransactionRequest{ Description = "Salário", Amount = 3000, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = TypeTransaction.Despesa};

        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => transactionService.CreateTransactionAsync(request));
        
        Assert.Equal("A categoria 'Trabalho' tem finalidade 'Receita' e não pode ser usada para transações do tipo 'Despesa'.", ex.Message);
    }
    
    // Teste criação com pessoa inexistente
    [Fact]
    public async Task CreateTransactionWithNonexistentPerson_ShouldReturnNotFoundException()
    {
        var (transactionService, personService, categoryService) = CreateServices();

        var nonexistentPerson = Guid.NewGuid();
            
        await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Trabalho", Purpose = Purpose.Receita });
        var request = new TransactionRequest{ Description = "Salário", Amount = 3000, PersonId = nonexistentPerson, CategoryId = category.Id, TypeTransaction = TypeTransaction.Receita};

        // Testa se uma exceção do tipo NotFoundException foi lançada no service CreateTransactionAsync
        var ex = await Assert.ThrowsAsync<NotFoundException>(
            () => transactionService.CreateTransactionAsync(request));

        Assert.Equal("Pessoa não encontrada.", ex.Message);
    }
    
    // Teste criação com categoria inexistente
    [Fact]
    public async Task CreateTransactionWithNonexistentCategory_ShouldReturnNotFoundException()
    {
        var (transactionService, personService, categoryService) = CreateServices();

        var nonexistentCategory = Guid.NewGuid();
            
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });
        await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Trabalho", Purpose = Purpose.Receita });
        var request = new TransactionRequest{ Description = "Salário", Amount = 3000, PersonId = person.Id, CategoryId = nonexistentCategory, TypeTransaction = TypeTransaction.Receita};

        var ex = await Assert.ThrowsAsync<NotFoundException>(
            () => transactionService.CreateTransactionAsync(request));

        Assert.Equal("Categoria não encontrada.", ex.Message);
    }
    
    // Teste de criação de receita com pessoa menor de idade
    [Fact]
    public async Task CreateTransactionWithTypeReceitaAndPersonMinor_ShouldReturnValidationException()
    {
        var (transactionService, personService, categoryService) = CreateServices();
            
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 12 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Trabalho", Purpose = Purpose.Receita });
        var request = new TransactionRequest{ Description = "Salário", Amount = 3000, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = TypeTransaction.Receita};

        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => transactionService.CreateTransactionAsync(request));
        
        Assert.Equal("Menores de 18 anos só podem registrar despesas.", ex.Message);
    }
    
    // Teste de criação de despesa com pessoa menor de idade
    [Fact]
    public async Task CreateTransactionWithTypeDespesaAndPersonMinor_ShouldReturnTransactionCreated()
    {
        var (transactionService, personService, categoryService) = CreateServices();
            
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 12 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Lazer", Purpose = Purpose.Despesa });
        var request = new TransactionRequest{ Description = "Jogo de videogame", Amount = 100, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = TypeTransaction.Despesa};

        var result = await transactionService.CreateTransactionAsync(request);
        
        Assert.Equal("Jogo de videogame", result.Description);
        Assert.Equal("Lucas Balbueno", result.PersonName);
        Assert.Equal("Lazer", result.CategoryDescription);
        Assert.Equal("Despesa", result.TypeTransaction);
    }
    
    // Teste de criação categoria com "Ambas"
    [Fact]
    public async Task CreateTransactionWithCategoryPurposeAmbas_ShouldReturnTransactionCreated()
    {
        var (transactionService, personService, categoryService) = CreateServices();
            
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 20 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Geral", Purpose = Purpose.Ambas });
        var request = new TransactionRequest{ Description = "Trabalho Freelance", Amount = 350, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = TypeTransaction.Receita};

        var result = await transactionService.CreateTransactionAsync(request);
        
        Assert.Equal("Trabalho Freelance", result.Description);
        Assert.Equal("Lucas Balbueno", result.PersonName);
        Assert.Equal("Geral", result.CategoryDescription);
        Assert.Equal("Receita", result.TypeTransaction);
    }
    
    // Teste de listar todas as transações
    [Fact]
    public async Task GetAllTransactions_ShouldReturnAllTransactions()
    {
        var (transactionService, personService, categoryService) = CreateServices();
            
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 20 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Geral", Purpose = Purpose.Ambas });
        var category2 = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Trabalho", Purpose = Purpose.Receita });

        await transactionService.CreateTransactionAsync(new TransactionRequest{ Description = "Trabalho Freelance", Amount = 500, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = TypeTransaction.Receita});
        await transactionService.CreateTransactionAsync(new TransactionRequest{ Description = "Salário Mensal", Amount = 3000, PersonId = person.Id, CategoryId = category2.Id, TypeTransaction = TypeTransaction.Receita});

        var result = await transactionService.GetAllTransactionAsync();
        
        Assert.Equal(2, result.Count());
    }
    
    // Teste de listar transação com id correto
    [Fact]
    public async Task GetTransactionWithCorrectId_ShouldReturnTransaction()
    {
        var (transactionService, personService, categoryService) = CreateServices();
            
        var person = await personService.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 20 });
        var category = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Livros", Purpose = Purpose.Despesa });
        var transaction = await transactionService.CreateTransactionAsync(new TransactionRequest { Description = "Game of Thrones", Amount = 70, PersonId = person.Id, CategoryId = category.Id, TypeTransaction = TypeTransaction.Despesa });
        
        var result = await transactionService.GetTransactionByIdAsync(transaction.Id);
        
        Assert.Equal("Game of Thrones", result.Description);
        Assert.Equal(70, result.Amount);
        Assert.Equal("Lucas Balbueno", result.PersonName);
        Assert.Equal("Livros", result.CategoryDescription);
        Assert.Equal("Despesa", result.TypeTransaction);
    }
    
    // Teste de listar transação com id incorreto
    [Fact]
    public async Task GetTransactionWithIncorrectId_ShouldNotFoundException()
    {
        var (transactionService, personService, categoryService) = CreateServices();

        var incorrectId = Guid.NewGuid();
        
        var ex = await Assert.ThrowsAsync<NotFoundException>(
            () => transactionService.GetTransactionByIdAsync(incorrectId));

        Assert.Equal("Transação não encontrada.", ex.Message);
    }
}