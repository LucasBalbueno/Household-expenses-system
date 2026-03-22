namespace webApi.Exceptions;

public class ValidationException : Exception
{
    // Exceção padronizada de validação
    public ValidationException(string message) : base(message) { }
}