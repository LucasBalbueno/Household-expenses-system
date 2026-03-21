namespace webApi.Domain.Entities;

public class Person
{
    // Identificador (deve ser um valor único gerado automaticamente);
    public Guid Id { get; set; }
    
    // Nome (texto com tamanho máximo de 200);
    public string Name { get; set; } = string.Empty;
    
    // Idade;
    public int Age { get; set; }
}