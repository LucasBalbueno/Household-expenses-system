using webApi.Domain.Enums;

namespace webApi.Domain.Entities;

public class Category
{
    // Identificador (deve ser um valor único gerado automaticamente);
    public Guid Id { get; set; }
    
    // Descrição (texto com tamanho máximo de 400);
    public string Description { get; set; } = string.Empty;

    // Finalidade (despesa/receita/ambas)
    public Purpose Purpose { get; set; }
}