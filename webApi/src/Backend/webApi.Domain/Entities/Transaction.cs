using webApi.Domain.Enums;

namespace webApi.Domain.Entities;

public class Transaction
{
    // Identificador (deve ser um valor único gerado automaticamente);
    public Guid Id { get; set; }
    
    // Descrição (texto com tamanho máximo de 400);
    public string Description { get; set; } = string.Empty;
    
    // Valor (número positivo);
    public decimal Amount { get; set; }
    
    // Tipo (despesa/receita);
    public TypeTransaction type { get; set; }
    
    // Categoria (identificador)
    public Guid CategoryId { get; set; }
    
    // Pessoa (identificador da pessoa do cadastro anterior);
    public Guid UserId { get; set; }
}