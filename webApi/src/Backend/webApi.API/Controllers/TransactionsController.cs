using Microsoft.AspNetCore.Mvc;
using webApi.Application.Services;
using webApi.Communication.Requests;

namespace webApi.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController: ControllerBase
{
    // Controller responsável pelas rotas de gerenciamento de transações
    // Cada método HTTP irá acionar uma função assíncrona de Service correspondente a sua função, retornando depois a resposta da requisição.

    // Dependency Injection com o arquivo service de transações (onde contém a lógica)
    private readonly TransactionService _transactionService;

    // Configuração do construtor da controller
    public TransactionsController(TransactionService transactionService)
    {
        _transactionService = transactionService;
    }
    
    // Método GET para listar todas as transações
    [HttpGet]
    public async Task<IActionResult> GetAllTransactions()
    {
        var result = await _transactionService.GetAllTransactionAsync();
        return Ok(result);
    }
    
    // Método GET para listar categoria por id
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetTransactionById(Guid id)
    {
        var result = await _transactionService.GetTransactionByIdAsync(id);
        return Ok(result);
    }
    
    // Método POST para criar uma categoria
    [HttpPost]
    public async Task<IActionResult> CreateTransaction([FromBody] TransactionRequest request)
    {
        var result = await _transactionService.CreateTransactionAsync(request);
        return Created(String.Empty, result);
    }
}