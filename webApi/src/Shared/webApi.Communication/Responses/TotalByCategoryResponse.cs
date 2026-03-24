using webApi.Domain.Enums;

namespace webApi.Communication.Responses;

public class TotalByCategoryResponse
{
    public List<CategoryTotalItem> Categories { get; set; } = new();
    public decimal TotalGeneralRevenues { get; set; }
    public decimal TotalGeneralExpenses { get; set; }
    public decimal TotalGeneralBalance { get; set; }
}

public class CategoryTotalItem
{
    public Guid CategoryId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string CategoryPurpose { get; set; } = string.Empty;
    public decimal TotalRevenues { get; set; }
    public decimal TotalExpenses { get; set; }
    public decimal Balance { get; set; }
}