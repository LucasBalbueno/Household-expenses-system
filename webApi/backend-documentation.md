# Documentação da API Backend

## Arquitetura DDD

Este projeto utiliza uma abordagem baseada em **Domain-Driven Design (DDD)** simplificado e **Clean Architecture**, focada na separação de responsabilidades e na manutenibilidade do código.

O backend está divídido inicialmente em duas pastas: **src (estrutura principal da aplicação** e **tests**.

A camada src possui 6 projetos: API, Application, Domain, Infrastructure, Shared (Communication e Exceptions).

### 1. Domain
**Responsabilidade:** Contém a lógica de negócio central e as regras que nunca mudam. Construção baseada na documentação do desafio.
- **Entities:** Representam os objetos de negócio (`Pessoa`, `Categoria`, `Transacao`).
- **Enums:** Definições fixas do sistema (`Finalidade`, `TipoTransacao`).
- **Repositories (Interfaces de Repositório):** Contratos que definem como os dados devem ser acessados, sem implementar a tecnologia (ex: `IPessoaRepository`).

### 2. Application
**Responsabilidade:** Orquestra o fluxo da aplicação. Ela recebe os pedidos da API e aplica as regras de negócio.
- **Services:** Onde a lógica com as regras de negócio acontece.

### 3. Infrastructure
**Responsabilidade:** Implementa os detalhes técnicos e a comunicação com o mundo externo.
- **Data (DbContext):** Configuração do Entity Framework Core e mapeamento para o SQLite.
- **Repositories:** Implementações reais das interfaces do Domain (Queries EF Core).

### 4. API
**Responsabilidade:** Expor os recursos via HTTP e lidar com o mundo web.
- **Controllers:** Controllers "finos" que apenas recebem a requisição e chamam o serviço correto.
- **Program.cs:** Configurações de Middlewares, CORS, Swagger e inicialização do Banco de Dados.

### 5. Shared Layers (Communication e Exceptions)
Para manter o projeto limpo e evitar referências circulares, isolamos o que é compartilhado:
- **Communication (DTOs):** Objetos de transferência de dados (Data Transfer Objects). Evitam expor as entidades do banco de dados diretamente para o front-end por segurança e performance.
- **Exceptions:** Centraliza o tratamento de erros. Contém o `ExceptionFilter` que transforma erros do C# em respostas amigáveis (400 Bad Request, 404 Not Found).

### 6. Tests
Camada de testes das principais funções e regras de negócio do projeto (Services).
- **Data:** Armazena a configuração do Banco de dados de teste (Em memória com EntityFramework Core).
- **Services:** Teste de todos os services da aplicação (regras de negócios).

## Fluxo de uma Requisição (Exemplo: Criar Pessoa)

1. **API**: Recebe um JSON no `PeopleController`.
2. **Application**: O `PersonService` recebe os dados, valida se o valor é positivo e se a categoria é compatível (regra de negócio).
3. **Domain**: O serviço usa as Entidades e Enums do Domain para garantir que o estado é válido.
4. **Infrastructure**: Se tudo estiver OK, o `PersonRepository` salva no SQLite.
5. **Shared**: O resultado é mapeado para um `PersonResponse` (DTO) e enviado de volta para o usuário.

## Vantagens desta Abordagem
- **Testabilidade**: Graças às interfaces, conseguimos testar a lógica sem precisar de um banco de dados real.
- **Substituibilidade**: Podemos trocar o banco SQLite por SQL Server alterando apenas a camada de Infrastructure.
- **Separação de responsabilidade e legibilidade de código**: Cada arquivo tem uma única responsabilidade clara.
- **Escalabilidade:** A arquitetura atual está pronta para um projeto escalável, com mais classes.