
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using webApi.Application.Services;
using webApi.Communication.Requests;

namespace webApi.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    // Controller responsável pelas rotas de gerenciamento de categorias
    // Cada método HTTP irá acionar uma função assíncrona de Service correspondente a sua função, retornando depois a resposta da requisição.

    // Dependency Injection com o arquivo service de categoritas (onde contém a lógica)
    private readonly CategoryService _categorySevice;

    // Configuração do construtor da controller
    public CategoriesController(CategoryService categoryService)
    {
        _categorySevice = categoryService;
    }
    
    // Método GET para listar todas as categorias
    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var result = await _categorySevice.GetAllCategoriesAsync();
        return Ok(result);
    }
    
    // Método GET para listar categoria por id
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetCategoryById(Guid id)
    {
        var result = await _categorySevice.GetCategoryByIdAsync(id);
        return Ok(result);
    }
    
    // Método POST para criar uma categoria
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CategoryRequest request)
    {
        var result = await _categorySevice.CreateCategoryAsync(request);
        return Created(String.Empty, result);
    }
}