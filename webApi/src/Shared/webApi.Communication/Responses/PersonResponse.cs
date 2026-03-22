namespace webApi.Communication.Responses;

public class PersonResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
}