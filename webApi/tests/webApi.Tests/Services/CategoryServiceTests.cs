using webApi.Application.Services;
using webApi.Communication.Requests;
using webApi.Domain.Enums;
using webApi.Exceptions;
using webApi.Infrastructure.Repositories;
using webApi.Tests.Data;

namespace webApi.Tests.Services;

public class CategoryServiceTests
{
    // Testes de Categoria Service (lógica + regra de negócio)

    // Método auxiliar para criar uma instância de CategoryService com o DB de testes configurado
    private static CategoryService CreateService()
    {
        var context = DbContextFactory.CreateDbContext();
        var categoryRepository = new CategoryRepository(context);
        return new CategoryService(categoryRepository);
    }
    
    // Teste de criar com dados válidos
    [Fact]
    public async Task CreateCategoryWithValidateData_ShouldReturnCategoryCreated()
    {
        // Chama a instância do service com DB test context
        var service = CreateService();
        
        // Cria um objeto Categoria (request)
        var request = new CategoryRequest { Description = "Mercado", Purpose = Purpose.Despesa };
        
        // Chama a função de criar no service passando a request como parâmetro
        var result = await service.CreateCategoryAsync(request);

        // Testa se Id não está vazio e se descrição e Finalidade estão corretos 
        Assert.NotEqual(Guid.Empty, result.Id);
        Assert.Equal("Mercado", result.Description);
        Assert.Equal("Despesa", result.Purpose);
    }
    
    // Teste de criar com descrição vazio
    [Fact]
    public async Task CreateCategoryWithEmptyDescription_ShouldReturnValidationException()
    {
        var service = CreateService();

        var request = new CategoryRequest { Description = "", Purpose = Purpose.Receita };

        // Testa se lança ValidationException ao chamar CreateCategoryAsync
        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => service.CreateCategoryAsync(request));
        
        // Testa mensagem da exceção
        Assert.Equal("O campo descrição é obrigatório.", ex.Message);
    }
    
    // Teste de criar com descrição maior que 400 caracteres
    [Fact]
    public async Task CreateCategoryWithBigDescription_ShouldReturnValidationException()
    {
        var service = CreateService();
        var bigDescription = new string('A', 401);

        var request = new CategoryRequest { Description = bigDescription, Purpose = Purpose.Despesa };

        // Testa se lança ValidationException ao chamar CreateCategoryAsync
        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => service.CreateCategoryAsync(request));
        
        // Testa mensagem da exceção
        Assert.Equal("A descrição não pode ter mais que 400 caracteres.", ex.Message);
    }
    
    // Teste de criar com finalidade "Ambas"
    [Fact]
    public async Task CreateCategoryWithPurposeAmbas_ShouldReturnPurposeAmbas()
    {
        var service = CreateService();

        var request = new CategoryRequest { Description = "Mercado", Purpose = Purpose.Ambas };

        // Chama o service de criar categoria passando o request
        var result = await service.CreateCategoryAsync(request);
        
        Assert.Equal("Ambas", result.Purpose);
    }
    
    // Teste de criar com finalidade incorreta
    [Fact]
    public async Task CreateCategoryWithIncorrectPurpose_ShouldReturnValidationException()
    {
        var service = CreateService();

        // Cria um objeto CategoryRequest com a finalidade incorreta (4)
        var request = new CategoryRequest { Description = "Mercado", Purpose = (Purpose)4 };
        
        // Testa se lança ValidationException ao chamar CreateCategoryAsync
        var ex = await Assert.ThrowsAsync<ValidationException>(
            () => service.CreateCategoryAsync(request));
        
        // Testa mensagem da exceção
        Assert.Equal("A finalidade informada é inválida. Use: 1 (Despesa), 2 (Receita) ou 3 (Ambas).", ex.Message);
    }
    
    // Teste de listar todas as categorias
    [Fact]
    public async Task GetAllCategories_ShouldReturnAllCategories()
    {
        var service = CreateService();

        // Cria 3 Categorias no banco de dados
        await service.CreateCategoryAsync(new CategoryRequest { Description = "Saúde", Purpose = Purpose.Despesa });
        await service.CreateCategoryAsync(new CategoryRequest { Description = "Trabalho", Purpose = Purpose.Receita });
        await service.CreateCategoryAsync(new CategoryRequest { Description = "Mercado", Purpose = Purpose.Despesa });

        // Chama a querie de buscar todas as categorias
        var result = await service.GetAllCategoriesAsync();
        
        // Testa se o total de categorias é 3
        Assert.Equal(3, result.Count());
    }
    
    // Teste de listar categoria com id correto
    [Fact]
    public async Task GetCategoryByCorrectId_ShouldReturnCategory()
    {
        var service = CreateService();

        // Cria categoria no banco
        var category =  await service.CreateCategoryAsync(new CategoryRequest { Description = "Mercado", Purpose = Purpose.Despesa});

        // Chama a querie de buscar categoria por id
        var result = await service.GetCategoryByIdAsync(category.Id);
        
        // Testa de Descrição e Finalidade estão corretos
        Assert.Equal("Mercado", result.Description);
        Assert.Equal("Despesa", result.Purpose);
    }
    
    // Teste de listar categoria com id incorreto
    [Fact]
    public async Task GetCategoryByIncorrectId_ShouldReturnNotFoundException()
    {
        var service = CreateService();
        
        // Cria um id incorreto (Aleatório fora do banco)
        var incorrectId = Guid.NewGuid();

        // Testa se lança NotFoundException ao chamar GetCategoryByIdAsync
        var ex = await Assert.ThrowsAsync<NotFoundException>(
            () => service.GetCategoryByIdAsync(incorrectId));
        
        // Testa mensagem da exceção
        Assert.Equal("Categoria não encontrada.", ex.Message);
    }
}