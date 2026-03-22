namespace webApi.Exceptions;

public class NotFoundException : Exception
{
    // Exceção padronizada NotFound
    public NotFoundException(string message) : base(message) { }
}