using webApi.Communication.Responses;
using webApi.Domain.Enums;
using webApi.Domain.Repositories;

namespace webApi.Application.Services;

public class ReportService
{
    // Camada Service de Relatórios, aqui ficará todas as regras de negócios e fará chamadas para os repositories de Infrastructure (Consultas do banco)
    
    // Depedency Injection dos repositories Relatório
    private readonly IReportRepository _reportRepository;

    // Configurando o construtor da classe e vinculando o repository de Relatório
    public ReportService(IReportRepository reportRepository)
    {
        _reportRepository = reportRepository;
    }

    // Serviço de buscar total por pessoa
    public async Task<TotalByPersonResponse> GetTotalByPersonAsync()
    {
        // Chama a função no repository (Infrastructure) que faz a busca no DB
        var people = await _reportRepository.GetAllTransactionsByPersonAsync();
        
        // Select(): Método LINQ que itera os dados de uma coleção (necessário por retorna uma lista de pessoas)
        var itens = people.Select(p =>
        {
            // Para cada pessoa, ele busca as transações e soma o valor onde o tipo da transação é receita
            var totalRevenues = p.Transactions
                .Where(t => t.Type == TypeTransaction.Receita)
                .Sum(t => t.Amount);

            // Para cada pessoa, ele busca as transações e soma o valor onde o tipo da transação é despesa
            var totalExpenses = p.Transactions
                .Where(t => t.Type == TypeTransaction.Despesa)
                .Sum(t => t.Amount);
            
            // Criar um objeto PersonTotalItem que armazena o total de receita, despesa e o saldo líquido de cada pessoa separadamente
            return new PersonTotalItem
            {
                PersonId = p.Id,
                Name = p.Name,
                TotalRevenues = totalRevenues,
                TotalExpenses = totalExpenses,
                Balance = totalRevenues - totalExpenses
            };
        }).ToList();

        // Retorna um objeto onde contem uma lista de PersonTotalItem e os totais de receita, despesa e saldo de todas as pessoas juntas
        return new TotalByPersonResponse
        {
            People = itens,
            TotalGeneralRevenues = itens.Sum(i => i.TotalRevenues),
            TotalGeneralExpenses = itens.Sum(i => i.TotalExpenses),
            TotalGeneralBalance = itens.Sum(i => i.Balance)
        };
    }

    // Serviço de buscar total por categoria
    public async Task<TotalByCategoryResponse> GetTotalByCategoryAsync()
    {
        // Chama a função no repository (Infrastructure) que faz a busca no DB
        var categories = await _reportRepository.GetAllTransactionsByCategoryAsync();

        // Select(): Método LINQ que itera os dados de uma coleção (necessário por retorna uma lista de categorias)
        var itens = categories.Select(c =>
        {
            // Para cada categoria, ele busca as transações e soma o valor onde o tipo da transação é receita
            var totalRevenues = c.Transactions
                .Where(t => t.Type == TypeTransaction.Receita)
                .Sum(t => t.Amount);

            // Para cada categoria, ele busca as transações e soma o valor onde o tipo da transação é despesa
            var totalExpenses = c.Transactions
                .Where(t => t.Type == TypeTransaction.Despesa)
                .Sum(t => t.Amount);

            // Criar um objeto CategoryTotalItem que armazena o total de receita, despesa e o saldo líquido de cada categoria separadamente
            return new CategoryTotalItem()
            {
                CategoryId = c.Id,
                Description = c.Description,
                CategoryPurpose = c.Purpose.ToString(),
                TotalRevenues = totalRevenues,
                TotalExpenses = totalExpenses,
                Balance = totalRevenues - totalExpenses
            };
        }).ToList();

        // Retorna um objeto onde contem uma lista de CategoryTotalItem e os totais de receita, despesa e saldo de todas as categorias juntas
        return new TotalByCategoryResponse
        {
            Categories = itens,
            TotalGeneralRevenues = itens.Sum(i => i.TotalRevenues),
            TotalGeneralExpenses = itens.Sum(i => i.TotalExpenses),
            TotalGeneralBalance = itens.Sum(i => i.Balance)
        };
    }
}