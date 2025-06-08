# 📦 Farms API

> Desafio técnico para a vaga de desenvolvedor backend na Brain AG (Serasa).  
> Aplicação construída com foco em boas práticas, escalabilidade e princípios de Clean Architecture + DDD com Nest.js.

---

## ✨ Visão Geral

Este projeto consiste em uma API RESTful que gerencia cadastro de produtores rurais, suas fazendas e suas safras.  
Foi desenvolvido com o objetivo de demonstrar capacidade técnica, visão arquitetural e boas práticas de engenharia de software.

---

## 🔧 Tecnologias e Conceitos Aplicados

- [x] **Nest.js** (v11.1) — estrutura modular, injeção de dependência nativa
- [x] **TypeScript** — tipagem estática para segurança e legibilidade
- [x] **DDD (Domain-Driven Design)** — separação clara entre camadas (domínio, aplicação, infraestrutura)
- [x] **Clean Architecture** — independência de frameworks e foco na lógica de negócio
- [x] **Prisma** — ORM moderno com migrations e tipagem automática
- [x] **PostgreSQL** — banco de dados relacional robusto
- [x] **Vitest** — testes unitários e e2e
- [x] **Docker** — ambiente isolado e reprodutível
- [x] **ESLint + Prettier** — padronização de código e pré-commit hooks

---

## 📁 Estrutura de Pastas

```bash
src
├── application
│   ├── queries
│   ├── repositories
│   └── use-cases
├── core
├── domain
├── entities
├── enums
├── validators
├── infra
│   ├── database
│   ├── http
│   ├── logger
│   └── utils
├── app.module.ts
├── main.ts
test
├── e2e
├── factories
├── repositories
└── setup.ts
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 22+
- Docker + Docker Compose (opcional)
- PostgreSQL rodando localmente (ou use `.env` customizado)

### Passos

```bash
# 1. Instalar dependências
pnpm install

# 2. Copiar .env.example para .env (substitua com suas credenciais)
cp .env.example .env

# 3. Criar e configurar o banco
pnpm prisma migrate dev

# 4. Rodar a aplicação
pnpm dev
```

### Docker (Usando Docker Compose)

```bash
# 1. Copiar .env.example para .env (substitua com suas credenciais)
cp .env.example .env

# 2. Iniciar o Docker Compose
docker compose up -d

# 3. Verificar status
docker compose ps
```

---

## 🧠 Pontos de Atenção

Durante o desenvolvimento, me preocupei não apenas em atender aos requisitos do desafio, mas também em tomar decisões técnicas que refletissem um código escalável, testável e sustentável. Aqui estão alguns pontos de atenção que merecem destaque:

### 📦 DDD e Orientação a Objetos

- A modelagem seguiu DDD aplicado com disciplina, priorizando clareza no domínio. Um exemplo foi a criação do objeto de valor `Document`, que encapsula a lógica comum entre CPF e CNPJ, mas não se justifica como entidade.
- A composição foi usada com equilíbrio entre entidades e value objects, refletindo as regras reais do negócio agrícola.
- Utilizei polimorfismo ao implementar um `BaseRepository`, garantindo interface consistente entre todos os repositórios — essencial numa aplicação CRUD-heavy.

### 🧩 Interpretação de Requisitos e Planejamento

- Apesar dos requisitos estarem claros, foi crucial entender as diferenças conceituais entre *cultura* e *safra*, o que impacta diretamente no design do domínio.
- Usei IA como assistente de briefing e planning, me ajudando a transformar requisitos em tarefas, e garantindo um mapeamento preciso antes de escrever a primeira linha de código.

### ✅ Boas Práticas e Clean Architecture

- As validações foram distribuídas estrategicamente:
  - **DTOs** cuidam de estrutura de entrada;
  - **Use cases** garantem pré-condições e lógica de fluxo;
  - **Domínio** concentra regras de negócio críticas (ex: soma de hectares agricultáveis e vegetação não pode ultrapassar o total da fazenda).
- Modelei primeiro toda a camada de domínio e use cases usando apenas TypeScript, sem depender de frameworks, o que reforçou a testabilidade e independência do core da aplicação.
- Implementei uma rota específica para servir o dashboard de forma otimizada, seguindo um **CQRS conceitual**: consultas separadas, sem misturar com a lógica de comando.

### 🚀 Escalabilidade, CI/CD e Observabilidade

- Toda a aplicação é dockerizada e possui pipeline de CI/CD:
  - Roda testes;
  - Valida o build;
  - Publica imagem no DockerHub;
  - Realiza deploy automático via SSH em VPS própria.
- Usei `Winston` com interceptors e filtros para garantir logs estruturados, prontos para crescer em ambientes mais críticos.
- A arquitetura respeita a separação por camadas (Clean Arch), garantindo que partes internas não dependam das externas — abrindo espaço para escalar e manter.

### ⚙️ Considerações Técnicas para o Futuro

- Para uma evolução natural da aplicação (pensando em dados analíticos), um **CQRS real** com event sourcing seria uma boa progressão.
- Testes de performance com `k6` e observabilidade com ferramentas como `New Relic` também estão no roadmap técnico como melhorias incrementais.
