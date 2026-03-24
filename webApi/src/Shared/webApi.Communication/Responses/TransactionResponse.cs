namespace webApi.Communication.Responses;

public class TransactionResponse
{
    public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string TypeTransaction { get; set; } = string.Empty;
    public string CategoryDescription { get; set; } = string.Empty;
    public string PersonName { get; set; } = string.Empty;
}