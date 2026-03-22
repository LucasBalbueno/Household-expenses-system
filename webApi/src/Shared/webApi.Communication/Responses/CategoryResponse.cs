namespace webApi.Communication.Responses;

public class CategoryResponse
{
    public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Purpose { get; set; } = string.Empty;
}