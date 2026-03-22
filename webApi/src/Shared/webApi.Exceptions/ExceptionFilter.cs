using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace webApi.Exceptions;

public class ExceptionFilter : IExceptionFilter
{
    // Arquivo de configuração das exceções. Responsável por capturar toda e qualquer exceção da aplicação e retornar uma exceção padrão, sem vazamento de informações.
    
    // Função principal onde disponibiliza o contexto (tudo sobre o erro captado)
    public void OnException(ExceptionContext context)
    {
        // Trata o erro de informação não encontrada - 404 Not Found
        if (context.Exception is NotFoundException notFoundException)
        {
            context.Result = new NotFoundObjectResult(new { message = notFoundException.Message });
            context.ExceptionHandled = true;
            return;
        }

        // Trata o erro de validação (regra de negócio) - 400 Bad Request
        if (context.Exception is ValidationException validationException)
        {
            context.Result = new BadRequestObjectResult(new {message = validationException.Message });
            context.ExceptionHandled = true;
            return;
        }

        // Trata o restante dos erros (não previstos) - 500 Internal Server Error
        context.Result = new ObjectResult(new { message = "Ocorreu um erro interno no servidor." })
        {
            StatusCode = 500
        };

        context.ExceptionHandled = true;
    }
}