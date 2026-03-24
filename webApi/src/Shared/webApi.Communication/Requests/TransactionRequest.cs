using webApi.Domain.Enums;

namespace webApi.Communication.Requests;

public class TransactionRequest
{
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public TypeTransaction TypeTransaction { get; set; }
    public Guid CategoryId { get; set; }
    public Guid PersonId { get; set; }
}