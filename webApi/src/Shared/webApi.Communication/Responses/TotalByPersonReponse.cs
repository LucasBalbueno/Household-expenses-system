namespace webApi.Communication.Responses;

public class TotalByPersonResponse
{
    public List<PersonTotalItem> People { get; set; } = new();
    public decimal TotalGeneralRevenues { get; set; }
    public decimal TotalGeneralExpenses { get; set; }
    public decimal TotalGeneralBalance { get; set; }
}

public class PersonTotalItem
{
    public Guid PersonId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal TotalRevenues { get; set; }
    public decimal TotalExpenses { get; set; }
    public decimal Balance { get; set; }
}