# Documentação Frontend - Sistema de Despesas Domésticas

## Visão Geral

Este projeto frontend utiliza **React 19** com **TypeScript** e **Vite** como bundler. A arquitetura segue uma estrutura em camadas bem definida para garantir separação de responsabilidades e manutenibilidade.

## Stack Tecnológico

- **React 19.2.4** - Biblioteca principal de UI
- **TypeScript 5.9.3** - Tipagem estática
- **Vite 8.0.1** - Build tool e dev server
- **ESLint** - Linting e code quality

## Estrutura da Arquitetura

```text
src/
 ├── pages/               -> Telas completas (views)
 │    ├── index.tsx       -> Página principal
 │    ├── People/         -> CRUD de pessoas
 │    ├── Categories/     -> CRUD de categorias
 │    └── Transactions/   -> CRUD de transações
 │
 ├── components/          -> Componentes reutilizáveis
 │    ├── ui/             -> Componentes genéricos (Input, Button, Modal)
 │    │    └── index.tsx
 │    └── layout/         -> Estrutura global (Header, Sidebar)
 │        └── index.tsx
 │
 ├── services/            -> Comunicação com backend
 │    └── api.ts          -> Configuração base da API
 │
 ├── hooks/               -> Lógica reutilizável
 │    └── index.tsx       -> Hooks personalizados
 │
 ├── types/               -> Tipos e interfaces
 │    └── type.ts         -> DTOs e contratos
 │
 ├── schemas/             -> Validações (Zod)
 │    └── index.tsx       -> Schemas de validação
 │
 ├── utils/               -> Funções auxiliares
 │    └── index.tsx       -> Helpers puros
 │
 ├── routes/              -> Configuração de rotas
 │    └── route.tsx        -> Definição das rotas
 │
 ├── App.tsx              -> Componente principal
 ├── main.tsx             -> Ponto de entrada
 └── App.css              -> Estilos globais
```

## Responsabilidade de Cada Camada

### 📄 pages/
**Função:** Montar telas completas e orquestrar o fluxo da interface.

**Responsabilidades:**
- Compor componentes para formar telas
- Gerenciar estado local da página
- Coordenar hooks e serviços
- Implementar fluxos de navegação

### 🧩 components/ui/
**Função:** Componentes visuais genéricos e reutilizáveis.

**Responsabilidades:**
- Componentes puros de UI
- Estilização e aparência
- Acessibilidade
- Não contêm lógica de negócio


### 🏗️ components/layout/
**Função:** Estrutura global e layout da aplicação.

**Responsabilidades:**
- Header, Sidebar, Footer
- Navegação principal
- Container e grid
- Estrutura responsiva


### 🌐 services/
**Função:** Comunicação com backend e centralização de chamadas HTTP.

**Responsabilidades:**
- Configuração da API
- Requisições HTTP
- Tratamento de erros
- Transformação de dados


### 🪝 hooks/
**Função:** Lógica reutilizável e compartilhada entre componentes.

**Responsabilidades:**
- Estado global compartilhado
- Lógica de negócio
- Efeitos colaterais
- Abstração de comportamentos


### 📝 types/
**Função:** Definição de tipos e interfaces TypeScript.

**Responsabilidades:**
- DTOs (Data Transfer Objects)
- Interfaces de contrato
- Tipos de domínio
- Definições de API

### ✅ schemas/
**Função:** Validação de dados e formulários (geralmente com Zod).

**Responsabilidades:**
- Validação de formulários
- Schema de API
- Transformação de dados
- Tipos derivados


### 🛠️ utils/
**Função:** Funções auxiliares puras e utilitários.

**Responsabilidades:**
- Formatação de dados
- Cálculos simples
- Validações puras
- Transformações

### 🛣️ routes/
**Função:** Configuração e organização das rotas da aplicação.

**Responsabilidades:**
- Definição de rotas
- Proteção de rotas
- Parâmetros de rota
- Navegação