using webApi.Communication.Requests;
using webApi.Communication.Responses;
using webApi.Domain.Entities;
using webApi.Domain.Repositories;
using webApi.Exceptions;

namespace webApi.Application.Services;

public class CategoryService
{
    // Camada Service de Categorias, aqui ficará todas as regras de negócios e fará chamadas para os repositories de Infrastructure (Consultas do banco)
    
    // Depedency Injection dos repositories Categoria
    private readonly ICategoryRepository _categoryRepository;
    
    // Configurando o construtor da classe e vinculando o repository de Categoria
    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    // Serviço de buscar todas as categorias
    public async Task<IEnumerable<CategoryResponse>> GetAllCategoriesAsync()
    {
        // Chama a função no repository (Infrastructure) que faz a busca no DB
        var categories = await _categoryRepository.GetAllAsync();

        // Converte os dados retornados da busca no objeto CategoryResponse (Response padrão configurada)
        // Select(): Método LINQ que itera os dados de uma coleção (necessário por retorna uma lista de categorias)
        return categories.Select(c => new CategoryResponse
        {
            Id = c.Id,
            Description = c.Description,
            Purpose = c.Purpose.ToString()
        });
    }

    // Serviço para buscar categoria por ID
    public async Task<CategoryResponse> GetCategoryByIdAsync(Guid id)
    {
        // Chama a função no repository (Infrastructure) que faz a busca no DB
        // Com uma condicional, se for null lançará uma exceção padronizada de webApi.Exceptions
        var category = await _categoryRepository.GetByIdAsync(id) ?? throw new NotFoundException("Categoria não encontrada.");

        // Converte os dados retornados da busca no objeto CategoryResponse (Response padrão configurada)
        return new CategoryResponse
        {
            Id = category.Id,
            Description = category.Description,
            Purpose = category.Purpose.ToString()
        };
    }

    public async Task<CategoryResponse> CreateCategoryAsync(CategoryRequest request)
    {
        // Chama função de validar dados de entrada
        ValidateData(request);

        // Cria um objeto Category com os dados de entrada e um id novo
        var category = new Category
        {
            Id = Guid.NewGuid(),
            Description = request.Description.Trim(),
            Purpose = request.Purpose
        };

        // Chama a função no repository (Infrastructure) que cria a categoria no DB
        await _categoryRepository.CreateAsync(category);
        // Chama a função no repository (Infrastructure) para salvar as alterações do DB
        await _categoryRepository.SaveChangesAsync();

        // Converte os dados retornados da busca no objeto CategoryResponse (Response padrão configurada)
        return new CategoryResponse
        {
            Id = category.Id,
            Description = category.Description,
            Purpose = category.Purpose.ToString()
        };
    }
    
    // Função para validar dados de entrada do Body para criar uma categoria
    private static void ValidateData(CategoryRequest request)
    {
        // Valida se description está vazio
        if (string.IsNullOrWhiteSpace(request.Description))
            throw new ValidationException("O campo descrição é obrigatório.");

        // Valida se description tem mais que 400 caracteres
        if (request.Description.Length > 400)
            throw new ValidationException("A descrição não pode ter mais que 400 caracteres.");

        // Valida se purpose é valido conforme o enum Purpose
        if (!Enum.IsDefined(request.Purpose))
            throw new ValidationException("A finalidade informada é inválida. Use: 1 (Despesa), 2 (Receita) ou 3 (Ambas).");
    }
}