# Household-expenses-system
Gerenciador de despesas residenciais (Aplicação Fullstack).

## Como executar o projeto

### Pré-requisitos

#### Backend (.NET 8)
- **.NET 8.0 SDK** - [Download aqui](https://dotnet.microsoft.com/download/dotnet/8.0)
- **SQLite**

#### Frontend (React)
- **Node.js** (versão 18 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (geralmente instalado com o Node.js)


### Passo a Passo para Execução

#### 1. Clonar o Repositório
```bash
git clone https://github.com/LucasBalbueno/Household-expenses-system.git
cd Household-expenses-system
```

#### 2. Configurar o Backend

O projeto já está configurado para usar SQLite por padrão e **sempre rodará na porta 5163**.

**Opção 1 - Usar script (Recomendado):**
```bash
cd webApi
./run.sh
```

**Opção 2 - Execução manual:**
```bash
# Navegar para a pasta do backend
cd webApi/src/Backend/webApi.API

# Executar a API
dotnet run
```

A API estará disponível em: `http://localhost:5163`
- **API Base**: `http://localhost:5163`
- **Swagger UI**: `http://localhost:5163/swagger`

#### 3. Configurar o Frontend

**Execução manual:**
```bash
# Navegar para a pasta do frontend (em outro terminal)
cd front

# Instalar dependências
npm install

# Executar o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

**Observação:** Caso o seu backend tenha sido iniciado em outra porta diferente de 5163, você precisará atualizar a URL de API no arquivo `api.ts` do frontend, localizado em: `front/src/services/api.ts`.

### 4. Acessar a Aplicação

- **Frontend**: Abra `http://localhost:5173` no navegador
- **API Documentation (Swagger)**: Abra `http://localhost:5163/swagger`

### Comandos Úteis

#### Backend
```bash
# Restaurar pacotes
dotnet restore

# Compilar o projeto
dotnet build

# Executar em modo de desenvolvimento
dotnet run

# Executar testes
cd tests
cd webApi.Tests
dotnet test
```

#### Frontend
```bash
# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev

# Compilar projeto
npm run build
```

<br>

## Documentação da API Backend

### Stack Tecnológico

- **.NET 8.0** - Framework principal
- **Entity Framework Core** - ORM
- **SQLite** - Banco de dados
- **xUnit** - Framework de testes

### Arquitetura DDD

Este projeto utiliza uma abordagem baseada em **Domain-Driven Design (DDD)** simplificado e **Clean Architecture**, focada na separação de responsabilidades e na manutenibilidade do código.

O backend está divídido inicialmente em duas pastas: **src (estrutura principal da aplicação** e **tests**.

A camada src possui 6 projetos: API, Application, Domain, Infrastructure, Shared (Communication e Exceptions).

#### 1. Domain
**Responsabilidade:** Contém a lógica de negócio central e as regras que nunca mudam. Construção baseada na documentação do desafio.
- **Entities:** Representam os objetos de negócio (`Pessoa`, `Categoria`, `Transacao`).
- **Enums:** Definições fixas do sistema (`Finalidade`, `TipoTransacao`).
- **Repositories (Interfaces de Repositório):** Contratos que definem como os dados devem ser acessados, sem implementar a tecnologia (ex: `IPessoaRepository`).

#### 2. Application
**Responsabilidade:** Orquestra o fluxo da aplicação. Ela recebe os pedidos da API e aplica as regras de negócio.
- **Services:** Onde a lógica com as regras de negócio acontece.

#### 3. Infrastructure
**Responsabilidade:** Implementa os detalhes técnicos e a comunicação com o mundo externo.
- **Data (DbContext):** Configuração do Entity Framework Core e mapeamento para o SQLite.
- **Repositories:** Implementações reais das interfaces do Domain (Queries EF Core).

#### 4. API
**Responsabilidade:** Expor os recursos via HTTP e lidar com o mundo web.
- **Controllers:** Controllers "finos" que apenas recebem a requisição e chamam o serviço correto.
- **Program.cs:** Configurações de Middlewares, CORS, Swagger e inicialização do Banco de Dados.

#### 5. Shared Layers (Communication e Exceptions)
Para manter o projeto limpo e evitar referências circulares, isolamos o que é compartilhado:
- **Communication (DTOs):** Objetos de transferência de dados (Data Transfer Objects). Evitam expor as entidades do banco de dados diretamente para o front-end por segurança e performance.
- **Exceptions:** Centraliza o tratamento de erros. Contém o `ExceptionFilter` que transforma erros do C# em respostas amigáveis (400 Bad Request, 404 Not Found).

#### 6. Tests
Camada de testes das principais funções e regras de negócio do projeto (Services).
- **Data:** Armazena a configuração do Banco de dados de teste (Em memória com EntityFramework Core).
- **Services:** Teste de todos os services da aplicação (regras de negócios).

### Fluxo de uma Requisição (Exemplo: Criar Pessoa)

1. **API**: Recebe um JSON no `PeopleController`.
2. **Application**: O `PersonService` recebe os dados, valida se o valor é positivo e se a categoria é compatível (regra de negócio).
3. **Domain**: O serviço usa as Entidades e Enums do Domain para garantir que o estado é válido.
4. **Infrastructure**: Se tudo estiver OK, o `PersonRepository` salva no SQLite.
5. **Shared**: O resultado é mapeado para um `PersonResponse` (DTO) e enviado de volta para o usuário.

### Vantagens desta Abordagem
- **Testabilidade**: Graças às interfaces, conseguimos testar a lógica sem precisar de um banco de dados real.
- **Substituibilidade**: Podemos trocar o banco SQLite por SQL Server alterando apenas a camada de Infrastructure.
- **Separação de responsabilidade e legibilidade de código**: Cada arquivo tem uma única responsabilidade clara.
- **Escalabilidade:** A arquitetura atual está pronta para um projeto escalável, com mais classes.


<br>

## Documentação Frontend

### Stack Tecnológico

- **React 19.2.4** - Biblioteca principal de UI
- **TypeScript 5.9.3** - Tipagem estática
- **Vite 8.0.1** - Build tool e dev server
- **ESLint** - Linting e code quality

### Arquitetura

#### Pages
**Função:** Montar telas completas e orquestrar o fluxo da interface.

**Responsabilidades:**
- Compor componentes para formar telas
- Gerenciar estado local da página
- Coordenar hooks e serviços
- Implementar fluxos de navegação

#### Components/ui
**Função:** Componentes visuais genéricos e reutilizáveis.

**Responsabilidades:**
- Componentes puros de UI
- Estilização e aparência
- Acessibilidade
- Não contêm lógica de negócio


#### Components/layout
**Função:** Estrutura global e layout da aplicação.

**Responsabilidades:**
- Header, Sidebar, Footer
- Navegação principal
- Container e grid
- Estrutura responsiva


#### Services
**Função:** Comunicação com backend e centralização de chamadas HTTP.

**Responsabilidades:**
- Configuração da API
- Requisições HTTP
- Tratamento de erros
- Transformação de dados


#### Hooks
**Função:** Lógica reutilizável e compartilhada entre componentes.

**Responsabilidades:**
- Estado global compartilhado
- Lógica de negócio
- Efeitos colaterais
- Abstração de comportamentos


#### Types
**Função:** Definição de tipos e interfaces TypeScript.

**Responsabilidades:**
- DTOs (Data Transfer Objects)
- Interfaces de contrato
- Tipos de domínio
- Definições de API

#### Schemas
**Função:** Validação de dados e formulários (geralmente com Zod).

**Responsabilidades:**
- Validação de formulários
- Schema de API
- Transformação de dados
- Tipos derivados


#### Utils
**Função:** Funções auxiliares puras e utilitários.

**Responsabilidades:**
- Formatação de dados
- Cálculos simples
- Validações puras
- Transformações

#### Routes
**Função:** Configuração e organização das rotas da aplicação.

**Responsabilidades:**
- Definição de rotas
- Proteção de rotas
- Parâmetros de rota
- Navegação