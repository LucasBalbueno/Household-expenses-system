using Microsoft.EntityFrameworkCore;
using webApi.Domain.Entities;

namespace webApi.Infrastructure.Data;

public class AppDbContext: DbContext
{
    // Configuração de conexão com o DB SQLite
    
    // Configuração da connection string (passada por Depedency Injection em Program.cs)
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    // Criação das tabelas no DB
    public DbSet<Person> People => Set<Person>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Transaction> Transactions => Set<Transaction>();

    // Configuração dos relacionamentos de Pessoa > Transações e Categoria > Transações
    // Configuração de Foreign Key e delete em cascata (se deletar Pessoa/Categoria as transações também são deletadas)
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>().HasMany(p => p.Transactions).WithOne(t => t.Person)
            .HasForeignKey(t => t.PersonId).OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Category>().HasMany(c => c.Transactions).WithOne(t => t.Category)
            .HasForeignKey(t => t.CategoryId).OnDelete(DeleteBehavior.Cascade);
    }
}