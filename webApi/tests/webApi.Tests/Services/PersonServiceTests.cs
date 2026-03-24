using webApi.Application.Services;
using webApi.Communication.Requests;
using webApi.Exceptions;
using webApi.Infrastructure.Repositories;
using webApi.Tests.Data;

namespace webApi.Tests.Services;

public class PersonServiceTests
{
    // Testes de Pessoa Service (lógica + regra de negócio)

    // Método auxiliar para criar uma instância de PersonService com o DB de testes configurado
    private static PersonService CreateService()
    {
        var context = DbContextFactory.CreateDbContext();
        var personRepository = new PersonRepository(context);
        var transactionRepository = new TransactionRepository(context);
        return new PersonService(personRepository, transactionRepository);
    }
    
    // Teste de criação com dados válidos
    [Fact]
    public async Task CreateWithValidatedData_ShouldReturnPersonCreated()
    {
        // Chama a instância do service com DB test context
        var service = CreateService();
        
        // Cria um objeto Pessoa (request)
        var request = new PersonRequest { Name = "Lucas Balbueno", Age = 22 };

        // Chama o service passando a request como parâmetro
        var result = await service.CreatePersonAsync(request);
        
        // Testa se Id não está vazio e se nome e idade estão corretos 
        Assert.NotEqual(Guid.Empty, result.Id);
        Assert.Equal("Lucas Balbueno", result.Name);
        Assert.Equal(22, result.Age);
    }
    
    // Teste de exceção nome vazio
    [Fact]
    public async Task CreatePersonWithEmptyName_ShouldReturnValidationException()
    {
        var service = CreateService();
        var request = new PersonRequest { Name = "", Age = 22 };

        // Testa se uma exceção do tipo ValidationException foi lançada no service CreatePersonAsync
        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => service.CreatePersonAsync(request));
        
        // Testa a mensagem da exceção
        Assert.Equal("O campo nome é obrigatório.", ex.Message);
    }
    
    // Teste de tamanho do nome (max 200 caracteres)
    [Fact]
    public async Task CreatePersonWithBigName_ShouldReturnValidationException()
    {
        // Cria uma string com 201 caracteres
        var bigName = new string('X', 201);
        
        var service = CreateService();
        var request = new PersonRequest { Name = bigName, Age = 22 };

        // Testa se uma exceção do tipo ValidationException foi lançada no service CreatePersonAsync
        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => service.CreatePersonAsync(request));
        
        // Testa a mensagem da exceção
        Assert.Equal("O nome não pode ter mais que 200 caracteres.", ex.Message);
    }
    
    // Teste de idade menor ou igual a zero
    [Fact]
    public async Task CreatePersonWithAgeZero_ShouldReturnValidationException()
    {
        var service = CreateService();
        var request = new PersonRequest { Name = "Lucas Balbueno", Age = 0 };
        
        // Testa se uma exceção do tipo ValidationException foi lançada no service CreatePersonAsync
        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => service.CreatePersonAsync(request));
        
        // Testa a mensagem da exceção
        Assert.Equal("A idade deve ser superior a zero.", ex.Message);
    }
    
    // Teste de listar todos as pessoas
    [Fact]
    public async Task GetAllPeople_ShouldReturnAllPeople()
    {
        var service = CreateService();

        // Criar duas pessoas no banco
        await service.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });
        await service.CreatePersonAsync(new PersonRequest { Name = "Roberta", Age = 24 });
        
        // Chama a querie de pegar todas as pessoas
        var result = await service.GetAllPeopleAsync();
        
        // Testa o total de pessoas encontradas
        Assert.Equal(2, result.Count());
    }

    // Teste de listar pessoa pelo id correto
    [Fact]
    public async Task GetPersonByIdWithCorrectId_ShouldReturnPerson()
    {
        var service = CreateService();

        // Cria uma pessoa no banco
        var person = await service.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });

        // Chama a querie de buscar pessoa pelo ID
        var result = await service.GetPersonByIdAsync(person.Id);
        
        // Testa se nome e idade estão corretos
        Assert.Equal("Lucas Balbueno", result.Name);
        Assert.Equal(22, result.Age);
    }
    
    // Teste de listar pessoa pelo id incorreto
    [Fact]
    public async Task GetPersonByIncorrectId_ShouldReturnNotFoundException()
    {
        var service = CreateService();

        // Cria um id inexistente
        var incorrectId = Guid.NewGuid();

        // Testa se uma exceção do tipo NotFoundException foi lançada no service GetPersonByIdAsync
        var ex = await Assert.ThrowsAsync<NotFoundException>(
            () => service.GetPersonByIdAsync(incorrectId));
        
        // Testa mensagem da exceção
        Assert.Equal("Pessoa não encontrada.", ex.Message);
    }
    
    // Teste de atualizar pessoa com dados válidos
    [Fact]
    public async Task UpdatePersonWithValidateData_ShouldReturnUpdatedPerson()
    {
        var service = CreateService();
        
        //Cria uma pessoa no banco
        var oldPerson = await service.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });

        // Cria um objeto de uma nova pessoa (request)
        var updatedPerson = new PersonRequest { Name = "Roberta", Age = 24 };

        // Chama a querie de atualizar a pessoa passando o id antigo e os novos dados
        var result = await service.UpdatePersonAsync(oldPerson.Id, updatedPerson);
        
        // Testa se nome e idade estão corretos
        Assert.Equal("Roberta", result.Name);
        Assert.Equal(24, result.Age);
    }
    
    // Teste de atualizar pessoa com ID incorreto
    [Fact]
    public async Task UpdatePersonWithIncorrectId_ShouldReturnNotFoundException()
    {
        var service = CreateService();
        
        // Cria um Id incorreto
        var incorrectId = Guid.NewGuid();

        // Cria um objeto de uma nova pessoa (request)
        var updatedPerson = new PersonRequest { Name = "Roberta", Age = 24 };

        // Testa se uma exceção do tipo NotFoundException foi lançada no service UpdatePersonAsync
        var ex = await Assert.ThrowsAsync<NotFoundException>(
            () => service.UpdatePersonAsync(incorrectId, updatedPerson));
        
        // Testa mensagem da exceção
        Assert.Equal("Pessoa não encontrada.", ex.Message);
    }
    
    // Teste de atualizar pessoa com nome vazio
    [Fact]
    public async Task UpdatePersonWithEmptyName_ShouldReturnValidationException()
    {
        var service = CreateService();
        
        //Cria uma pessoa no banco
        var oldPerson = await service.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });

        // Cria um objeto de uma nova pessoa (request)
        var updatedPerson = new PersonRequest { Name = "", Age = 24 };
        
        // Testa se uma exceção do tipo ValidationException foi lançada no service UpdatePersonAsync
        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => service.UpdatePersonAsync(oldPerson.Id, updatedPerson));
        
        // Testa mensagem da exceção
        Assert.Equal("O campo nome é obrigatório.", ex.Message);
    }
    
    // Teste de atualizar com o nome maior que 200 caracteres
    [Fact]
    public async Task UpdatePersonWithBigName_ShouldReturnValidationException()
    {
        var service = CreateService();
        
        // Cria uma pessoa no banco
        var oldPerson = await service.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });

        // Cria um nome com 201 caracteres
        var bigName = new string('A', 201);
        
        // Cria um objeto de uma nova pessoa (request)
        var updatedPerson = new PersonRequest { Name = bigName, Age = 24 };
        
        // Testa se uma exceção do tipo ValidationException foi lançada no service UpdatePersonAsync
        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => service.UpdatePersonAsync(oldPerson.Id, updatedPerson));
        
        // Testa mensagem da exceção
        Assert.Equal("O nome não pode ter mais que 200 caracteres.", ex.Message);
    }
    
    // Teste de atualizar pessoa com idade menor ou igual a zero
    [Fact]
    public async Task UpdatePersonWithAgeZero_ShouldReturnValidationException()
    {
        var service = CreateService();
        
        //Cria uma pessoa no banco
        var oldPerson = await service.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });
        
        // Cria um objeto de uma nova pessoa (request)
        var updatedPerson = new PersonRequest { Name = "Lucas", Age = 0 };
        
        // Testa se uma exceção do tipo ValidationException foi lançada no service UpdatePersonAsync
        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => service.UpdatePersonAsync(oldPerson.Id, updatedPerson));
        
        // Testa mensagem da exceção
        Assert.Equal("A idade deve ser superior a zero.", ex.Message);
    }
    
    // Teste de deletar com id correto
    [Fact]
    public async Task DeletePersonWithCorrectId_ShouldDeletePerson()
    {
        var service = CreateService();

        // Cria uma pessoa no banco
        var person = await service.CreatePersonAsync(new PersonRequest { Name = "Lucas Balbueno", Age = 22 });

        // Deleta a pessoa do banco
        await service.DeletePersonAsync(person.Id);

        // Testa se lança uma exceção de pessoa não encontrada
        await Assert.ThrowsAsync<NotFoundException>(
            () => service.GetPersonByIdAsync(person.Id));
    }
    
    // Teste de deletar com id incorreto
    [Fact]
    public async Task DeletePersonWithIncorrectId_ShouldReturnNotFoundException()
    {
        var service = CreateService();

        // Cria um id incorreto
        var incorrectId = Guid.NewGuid();

        // Testa se lança uma exceção de pessoa não encontrada
        await Assert.ThrowsAsync<NotFoundException>(
            () => service.GetPersonByIdAsync(incorrectId));
    }
}