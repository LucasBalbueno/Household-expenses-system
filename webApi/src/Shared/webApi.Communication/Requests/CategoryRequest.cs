using webApi.Domain.Enums;

namespace webApi.Communication.Requests;

public class CategoryRequest
{
    public string Description { get; set; } = String.Empty;
    public Purpose Purpose { get; set; }
}