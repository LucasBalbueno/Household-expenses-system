using Microsoft.AspNetCore.Mvc;
using webApi.Application.Services;

namespace webApi.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportsController: ControllerBase
{
    // Controller responsável pelas rotas de gerenciamento de relatórios
    // Cada método HTTP irá acionar uma função assíncrona de Service correspondente a sua função, retornando depois a resposta da requisição.

    // Dependency Injection com o arquivo service de relatórios (onde contém a lógica)
    private readonly ReportService _reportService;

    // Configuração do construtor da controller
    public ReportsController(ReportService reportService)
    {
        _reportService = reportService;
    }
    
    // Método GET total por pessoas
    [HttpGet("get-total-by-person")]
    public async Task<IActionResult> GetTotalByPerson()
    {
        var result = await _reportService.GetTotalByPersonAsync();
        return Ok(result);
    }
    
    // Método GET total por categorias
    [HttpGet("get-total-by-category")]
    public async Task<IActionResult> GetTotalByCategory()
    {
        var result = await _reportService.GetTotalByCategoryAsync();
        return Ok(result);
    }
}