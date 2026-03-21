# Documentação da API Backend

## Arquitetura

Este projeto utiliza uma abordagem baseada em **Domain-Driven Design (DDD)** simplificado e **Clean Architecture**, focada na separação de responsabilidades e na manutenibilidade do código.

O backend está divídido inicialmente em duas pastas: **src (estrutura principal da aplicação** e **tests**.

A camada src possui 6 projetos: API, Application, Domain, Infrastructure, Shared (Communication e Exceptions).

### 1. Domain
**Responsabilidade:** Contém a lógica de negócio central e as regras que nunca mudam. Construção baseada na documentação do desafio.
- **Entities:** Representam os objetos de negócio (`Pessoa`, `Categoria`, `Transacao`).
- **Enums:** Definições fixas do sistema (`Finalidade`, `TipoTransacao`).
- **Repositories (Interfaces de Repositório):** Contratos que definem como os dados devem ser acessados, sem implementar a tecnologia (ex: `IPessoaRepository`).