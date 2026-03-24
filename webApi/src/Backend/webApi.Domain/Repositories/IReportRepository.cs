using webApi.Domain.Entities;

namespace webApi.Domain.Repositories;

public interface IReportRepository
{
    // Contrato de operações CRUD para o ReportService e ReportRepository (Infrastructure)
    // Task para representar assincronismo
    // IEnumerable para retornar uma coleção de pessoas/categorias, podendo ser uma lista ou outro tipo de coleção
    
    // READ: Retorna o total de transações por pessoa
    Task<IEnumerable<Person>> GetAllTransactionsByPersonAsync();
    // READ: Retorna o total de transações por categoria
    Task<IEnumerable<Category>> GetAllTransactionsByCategoryAsync();
}