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

**Exemplo de uso:**
```tsx
// pages/People/index.tsx
import { useState } from 'react'
import { Button } from '../../components/ui'
import { usePeople } from '../../hooks'
import { PersonForm } from '../../components'

export function PeoplePage() {
  const { people, loading, createPerson } = usePeople()
  const [showForm, setShowForm] = useState(false)

  const handleCreate = async (data: PersonData) => {
    await createPerson(data)
    setShowForm(false)
  }

  return (
    <div>
      <h1>Gerenciar Pessoas</h1>
      <Button onClick={() => setShowForm(true)}>
        Nova Pessoa
      </Button>
      
      {showForm && (
        <PersonForm 
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}
      
      <PeopleList people={people} loading={loading} />
    </div>
  )
}
```

### 🧩 components/ui/
**Função:** Componentes visuais genéricos e reutilizáveis.

**Responsabilidades:**
- Componentes puros de UI
- Estilização e aparência
- Acessibilidade
- Não contêm lógica de negócio

**Exemplo de uso:**
```tsx
// components/ui/index.tsx
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// Uso em uma página:
import { Button } from '../../components/ui'

<Button variant="secondary" onClick={handleCancel}>
  Cancelar
</Button>
```

### 🏗️ components/layout/
**Função:** Estrutura global e layout da aplicação.

**Responsabilidades:**
- Header, Sidebar, Footer
- Navegação principal
- Container e grid
- Estrutura responsiva

**Exemplo de uso:**
```tsx
// components/layout/index.tsx
import { ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-layout">
      <Header />
      <div className="app-content">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}

// Uso no App.tsx:
<Layout>
  <Routes>
    <Route path="/people" element={<PeoplePage />} />
  </Routes>
</Layout>
```

### 🌐 services/
**Função:** Comunicação com backend e centralização de chamadas HTTP.

**Responsabilidades:**
- Configuração da API
- Requisições HTTP
- Tratamento de erros
- Transformação de dados

**Exemplo de uso:**
```tsx
// services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
})

export const peopleService = {
  getAll: () => api.get('/people'),
  getById: (id: string) => api.get(`/people/${id}`),
  create: (data: PersonData) => api.post('/people', data),
  update: (id: string, data: PersonData) => api.put(`/people/${id}`, data),
  delete: (id: string) => api.delete(`/people/${id}`),
}

// Uso em um hook:
import { peopleService } from '../../services/api'

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([])
  
  const fetchPeople = async () => {
    try {
      const response = await peopleService.getAll()
      setPeople(response.data)
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error)
    }
  }
  
  return { people, fetchPeople }
}
```

### 🪝 hooks/
**Função:** Lógica reutilizável e compartilhada entre componentes.

**Responsabilidades:**
- Estado global compartilhado
- Lógica de negócio
- Efeitos colaterais
- Abstração de comportamentos

**Exemplo de uso:**
```tsx
// hooks/index.tsx
import { useState, useEffect } from 'react'
import { peopleService } from '../services/api'

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPeople = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await peopleService.getAll()
      setPeople(response.data)
    } catch (err) {
      setError('Falha ao carregar pessoas')
    } finally {
      setLoading(false)
    }
  }

  const createPerson = async (data: PersonData) => {
    try {
      await peopleService.create(data)
      await fetchPeople() // Recarrega lista
    } catch (err) {
      setError('Falha ao criar pessoa')
      throw err
    }
  }

  useEffect(() => {
    fetchPeople()
  }, [])

  return {
    people,
    loading,
    error,
    createPerson,
    refetch: fetchPeople,
  }
}

// Uso em uma página:
const { people, loading, error, createPerson } = usePeople()
```

### 📝 types/
**Função:** Definição de tipos e interfaces TypeScript.

**Responsabilidades:**
- DTOs (Data Transfer Objects)
- Interfaces de contrato
- Tipos de domínio
- Definições de API

**Exemplo de uso:**
```tsx
// types/type.ts
export interface Person {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface PersonData {
  name: string
  email: string
  phone?: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// Uso em componentes:
import { Person, PersonData } from '../../types/type'

const [person, setPerson] = useState<PersonData>({
  name: '',
  email: '',
})
```

### ✅ schemas/
**Função:** Validação de dados e formulários (geralmente com Zod).

**Responsabilidades:**
- Validação de formulários
- Schema de API
- Transformação de dados
- Tipos derivados

**Exemplo de uso:**
```tsx
// schemas/index.tsx
import { z } from 'zod'

export const personSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
})

export type PersonFormData = z.infer<typeof personSchema>

// Uso em formulários:
import { personSchema, type PersonFormData } from '../../schemas'

const { register, handleSubmit, formState: { errors } } = useForm<PersonFormData>({
  resolver: zodResolver(personSchema)
})

<input 
  {...register('name')}
  placeholder="Nome"
/>
{errors.name && <span>{errors.name.message}</span>}
```

### 🛠️ utils/
**Função:** Funções auxiliares puras e utilitários.

**Responsabilidades:**
- Formatação de dados
- Cálculos simples
- Validações puras
- Transformações

**Exemplo de uso:**
```tsx
// utils/index.tsx
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('pt-BR')
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Uso em componentes:
import { formatCurrency, formatDate } from '../../utils'

<span>{formatCurrency(transaction.amount)}</span>
<span>{formatDate(transaction.createdAt)}</span>
```

### 🛣️ routes/
**Função:** Configuração e organização das rotas da aplicação.

**Responsabilidades:**
- Definição de rotas
- Proteção de rotas
- Parâmetros de rota
- Navegação

**Exemplo de uso:**
```tsx
// routes/route.tsx
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/layout'
import { PeoplePage } from '../pages'
import { ProtectedRoute } from '../components/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <div>Home</div>,
      },
      {
        path: '/people',
        element: (
          <ProtectedRoute>
            <PeoplePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/transactions',
        element: <TransactionsPage />,
      },
    ],
  },
])

// Uso no main.tsx:
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

<RouterProvider router={router} />
```

## Regras Principais da Arquitetura

### 🚫 Não Misturar Responsabilidades

1. **Pages** não fazem chamadas HTTP diretas
   - ✅ Usam hooks que encapsulam a lógica
   - ❌ `axios.get()` diretamente no componente

2. **Components** não concentram regra de negócio
   - ✅ Recebem props e emitem eventos
   - ❌ Lógica complexa dentro de componentes

3. **Services** não cuidam de renderização
   - ✅ Apenas comunicação HTTP
   - ❅ Retornam dados, não JSX

4. **Validação** fica em schemas
   - ✅ Zod schemas para validação
   - ❌ Validação espalhada pelos componentes

### 📋 Fluxo de Dados Recomendado

```
User Action → Page → Hook → Service → API
                ↓
            Component ← Props ← State
```

### 🎯 Boas Práticas

1. **Single Responsibility**: Cada arquivo tem uma responsabilidade clara
2. **Dependency Injection**: Dependências passadas como props
3. **Error Boundaries**: Tratamento de erros em camadas adequadas
4. **Type Safety**: Tipagem forte em todo o fluxo
5. **Testability**: Lógica separada facilita testes

## Exemplo Completo de Fluxo

### 1. Type Definition
```tsx
// types/type.ts
export interface Person {
  id: string
  name: string
  email: string
}
```

### 2. Schema Validation
```tsx
// schemas/index.tsx
export const personSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})
```

### 3. API Service
```tsx
// services/api.ts
export const peopleService = {
  getAll: () => api.get<Person[]>('/people'),
  create: (data: PersonData) => api.post<Person>('/people', data),
}
```

### 4. Custom Hook
```tsx
// hooks/index.tsx
export function usePeople() {
  const [people, setPeople] = useState<Person[]>([])
  
  const createPerson = async (data: PersonData) => {
    const response = await peopleService.create(data)
    setPeople(prev => [...prev, response.data])
  }
  
  return { people, createPerson }
}
```

### 5. UI Component
```tsx
// components/ui/index.tsx
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}
```

### 6. Page Component
```tsx
// pages/People/index.tsx
export function PeoplePage() {
  const { people, createPerson } = usePeople()
  
  return (
    <div>
      <Button onClick={() => createPerson({ name: 'Test', email: 'test@test.com' })}>
        Adicionar Pessoa
      </Button>
      {people.map(person => (
        <div key={person.id}>{person.name}</div>
      ))}
    </div>
  )
}
```

Esta arquitetura garante código organizado, testável e fácil de manter, com separação clara de responsabilidades e fluxo de dados previsível.
