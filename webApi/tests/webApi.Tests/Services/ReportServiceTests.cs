using webApi.Application.Services;
using webApi.Communication.Requests;
using webApi.Domain.Enums;
using webApi.Infrastructure.Repositories;
using webApi.Tests.Data;

namespace webApi.Tests.Services;

public class ReportServiceTests
{
    // Testes de Relatório Service (lógica + regra de negócio)

    // Método auxiliar para criar uma instância de ReportService com dados já configurados (pessoas, categorias e transações criadas)
    private static async Task<ReportService> CreateServiceWithData()
    {
        var context = DbContextFactory.CreateDbContext();
        var reportsRepository = new ReportRepository(context);

        var personRepository = new PersonRepository(context);
        var categoryRepository = new CategoryRepository(context);
        var transactionRepository = new TransactionRepository(context);
        
        var personService = new PersonService(personRepository, transactionRepository);
        var categoryService = new CategoryService(categoryRepository);
        var transactionService = new TransactionService(transactionRepository, personRepository, categoryRepository);

        var person1 = await personService.CreatePersonAsync(new PersonRequest { Name = "João", Age = 35});
        var person2 = await personService.CreatePersonAsync(new PersonRequest { Name = "Marcelo", Age = 56});

        var category1 = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Mercado", Purpose = Purpose.Despesa});
        var category2 = await categoryService.CreateCategoryAsync(new CategoryRequest { Description = "Trabalho", Purpose = Purpose.Receita});
        
        await transactionService.CreateTransactionAsync(new TransactionRequest { Description = "Compra picolé", Amount = 5, TypeTransaction = TypeTransaction.Despesa, CategoryId = category1.Id, PersonId = person1.Id});
        await transactionService.CreateTransactionAsync(new TransactionRequest { Description = "Rancho Mensal", Amount = 750, TypeTransaction = TypeTransaction.Despesa, CategoryId = category1.Id, PersonId = person2.Id});
        await transactionService.CreateTransactionAsync(new TransactionRequest { Description = "Trabalho Freelance", Amount = 1200, TypeTransaction = TypeTransaction.Receita, CategoryId = category2.Id, PersonId = person1.Id});
        await transactionService.CreateTransactionAsync(new TransactionRequest { Description = "Salário Mensal", Amount = 5500, TypeTransaction = TypeTransaction.Receita, CategoryId = category2.Id, PersonId = person2.Id});

        return new ReportService(reportsRepository);
    }
    
    // Teste calcular receita, despesa e saldo por pessoa
    [Fact]
    public async Task CalculateTotalByPerson_ShouldCalculateTotal()
    {
        // Chama a instância do service com DB test context
        var service = await CreateServiceWithData();
        
        // Chama o service GetTotalByPersonAsync
        var result = await service.GetTotalByPersonAsync();
        
        // Verifica a quantidade de pessoas
        Assert.Equal(2, result.People.Count);

        // First(): Acha a primeira pessoa pelo nome e testa os totais
        var person1 = result.People.First(p => p.Name == "João");
        Assert.Equal(1200m, person1.TotalRevenues);
        Assert.Equal(5m, person1.TotalExpenses);
        Assert.Equal(1195m, person1.Balance);

        // First(): Acha a primeira pessoa pelo nome e testa os totais
        var person2 = result.People.First(p => p.Name == "Marcelo");
        Assert.Equal(5500m, person2.TotalRevenues);
        Assert.Equal(750m, person2.TotalExpenses);
        Assert.Equal(4750m, person2.Balance);
    }
    
    // Teste de calcular receita, despesa e saldo de todas as pessoas
    [Fact]
    public async Task CalculateTotalGeneralPeople_ShouldCalculateTotalGeneral()
    {
        var service = await CreateServiceWithData();
        
        // Chama o service GetTotalByPersonAsync
        var result = await service.GetTotalByPersonAsync();
        
        // Testa os totais
        Assert.Equal(6700m, result.TotalGeneralRevenues);
        Assert.Equal(755m, result.TotalGeneralExpenses);
        Assert.Equal(5945m, result.TotalGeneralBalance);
    }
    
    // Teste calcular receita, despesa e saldo por categoria
    [Fact]
    public async Task CalculateTotalByCategory_ShouldCalculateTotal()
    {
        var service = await CreateServiceWithData();
        
        var result = await service.GetTotalByCategoryAsync();
        
        // Verifica a quantidade de categorias
        Assert.Equal(2, result.Categories.Count);
        
        // First(): Acha a primeira categoria pela descrição e testa os totais
        var category1 = result.Categories.First(c => c.Description == "Mercado");
        Assert.Equal(0m, category1.TotalRevenues);
        Assert.Equal(755m, category1.TotalExpenses);
        Assert.Equal(-755m, category1.Balance);
        
        // First(): Acha a primeira categoria pela descrição e testa os totais
        var category2 = result.Categories.First(c => c.Description == "Trabalho");
        Assert.Equal(6700m, category2.TotalRevenues);
        Assert.Equal(0m, category2.TotalExpenses);
        Assert.Equal(6700m, category2.Balance);
    }
    
    // Teste de calcular receita, despesa e saldo de todas as categorias
    [Fact]
    public async Task CalculateTotalGeneralCategories_ShouldCalculateTotalGeneral()
    {
        var service = await CreateServiceWithData();
        
        // Chama o service GetTotalByCategoryAsync
        var result = await service.GetTotalByCategoryAsync();
        
        // Testa os totais
        Assert.Equal(6700, result.TotalGeneralRevenues);
        Assert.Equal(755m, result.TotalGeneralExpenses);
        Assert.Equal(5945m, result.TotalGeneralBalance);
    }
    
    // Teste sem transações. Deve retornar zero
    [Fact]
    public async Task CalculateTotalWithoutTransaction_ShouldReturnTotalZero()
    {
        // Cria uma instância de ReportService
        var context = DbContextFactory.CreateDbContext();
        var reportRepository = new ReportRepository(context);
        var reportService = new ReportService(reportRepository);
        
        // Chama o service GetTotalByCategoryAsync
        var result = await reportService.GetTotalByPersonAsync();
        
        // Testa os totais
        Assert.Equal(0m, result.TotalGeneralRevenues);
        Assert.Equal(0m, result.TotalGeneralExpenses);
        Assert.Equal(0m, result.TotalGeneralBalance);
    }
}