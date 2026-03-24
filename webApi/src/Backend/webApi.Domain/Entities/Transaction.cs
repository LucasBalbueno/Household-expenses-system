using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webApi.Domain.Enums;

namespace webApi.Domain.Entities;

public class Transaction
{
    // Identificador (deve ser um valor único gerado automaticamente);
    public Guid Id { get; set; }
    
    // Descrição (texto com tamanho máximo de 400);
    [Required]
    [MaxLength(400)]
    public string Description { get; set; } = string.Empty;
    
    // Valor (número positivo);
    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }
    
    // Tipo (despesa/receita);
    [Required]
    public TypeTransaction Type { get; set; }
    
    // Categoria (identificador)
    public Guid CategoryId { get; set; }
    // Relacionamento com Categoria
    // O ! indica que a propriedade não pode ser nula, garantindo que sempre haverá uma categoria associada à transação.
    public Category Category { get; set; } = null!;
    
    // Pessoa (identificador da pessoa do cadastro anterior);
    public Guid PersonId { get; set; }
    // Relacionamento com Pessoa
    // O ! indica que a propriedade não pode ser nula, garantindo que sempre haverá uma categoria associada à transação.
    public Person Person { get; set; } = null!;
}