namespace webApi.Domain.Entities;

public class Person
{
    // Identificador (deve ser um valor único gerado automaticamente);
    public Guid Id { get; set; }
    
    // Nome (texto com tamanho máximo de 200);
    public string Name { get; set; } = string.Empty;
    
    // Idade;
    public int Age { get; set; }
    
    // Relacionamento 1:N com Transação (uma pessoa pode ter várias transações, mas cada transação pertence a apenas uma pessoa);
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}