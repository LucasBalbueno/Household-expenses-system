using Microsoft.AspNetCore.Mvc;
using webApi.Application.Services;
using webApi.Communication.Requests;

namespace webApi.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PeopleController: ControllerBase
{
    // Controller responsável pelas rotas de gerenciamento de pessoas
    // Cada método HTTP irá acionar uma função assíncrona de Service correspondente a sua função, retornando depois a resposta da requisição.

    // Dependency Injection com o arquivo service de pessoas (onde contém a lógica)
    private readonly PersonService _personService;

    // Configuração do construtor da controller
    public PeopleController(PersonService personService)
    {
        _personService = personService;
    }

    // Método GET para listar todas as pessoas
    [HttpGet]
    public async Task<IActionResult> GetAllPeople()
    {
        var result = await _personService.GetAllPeopleAsync();
        return Ok(result);
    }

    // Método GET para listas pessoas pelo id
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetPersonById(Guid id)
    {
        var result = await _personService.GetPersonByIdAsync(id);
        return Ok(result);
    }

    // Método POST para criar uma pessoa
    [HttpPost]
    public async Task<IActionResult> CreatePerson([FromBody] PersonRequest request)
    {
        var result = await _personService.CreatePersonAsync(request);
        return Created(string.Empty, result);
    }

    // Método PUT para atualizar uma pessoa
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdatePerson(Guid id, [FromBody] PersonRequest request)
    {
        var result = await _personService.UpdatePersonAsync(id, request);
        return Ok(result);
    }

    // Método DELETE para deletar uma pessoa
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeletePerson(Guid id)
    {
        await _personService.DeletePersonAsync(id);
        return NoContent();
    }
}