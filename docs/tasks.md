# 🗒️ **Tabela de Tasks (Backlog)**

| ID      | Task                           | Descrição                                                                                       | Categoria      | Prioridade | Status |
| ------- | ------------------------------ | ----------------------------------------------------------------------------------------------- | -------------- | ---------- | ------ |
| **T01** | Setup do Projeto               | Configurar projeto Node.js + TypeScript + NestJS com ESLint, Prettier e Husky                   | Setup          | Alta       |   OK   |        
| **T02** | Setup do Docker                | Criar dockerfile, docker-compose com PostgreSQL e configuração de volumes                       | Setup          | Alta       |        |
| **T03** | Configuração do ORM            | Instalar e configurar Prisma (ou TypeORM) com conexão ao PostgreSQL                             | Setup          | Alta       |   OK   |
| **T04** | Estrutura da Arquitetura       | Definir e criar a base da arquitetura em camadas: Domain, Application e Infrastructure          | Arquitetura    | Alta       |   OK   |        
| **T05** | Entidade: Produtor             | Modelar entidade Produtor, incluindo CPF/CNPJ como objeto de valor                              | Domain         | Alta       |   OK   |
| **T06** | Entidade: Fazenda              | Modelar entidade Fazenda com objetos de valor Área e Endereço                                   | Domain         | Alta       |   OK   |
| **T07** | Entidade: Safra                | Modelar entidade Safra                                                                          | Domain         | Média      |   OK   |
| **T08** | Entidade: Cultura              | Modelar entidade Cultura                                                                        | Domain         | Média      |   OK   |
| **T09** | Relacionamentos                | Implementar relacionamentos entre Produtor → Fazenda → Safra → Cultura                          | Domain         | Alta       |   OK   |
| **T10** | Repository Pattern             | Implementar contratos de repositórios (interfaces) para cada entidade                           | Application    | Alta       |   OK   |
| **T11** | Implementação dos Repositórios | Implementação concreta dos repositórios usando Prisma/TypeORM                                   | Infrastructure | Alta       |   OK   |
| **T12** | Use Cases: CRUD Produtor       | Criar use cases para criar, editar, excluir e listar produtores                                 | Application    | Alta       |   OK   |
| **T13** | Use Cases: CRUD Fazenda        | Criar use cases para criar, editar, excluir e listar fazendas                                   | Application    | Alta       |   OK   |
| **T14** | Use Cases: CRUD Safra          | Criar use cases para criar, editar, excluir e listar safras                                     | Application    | Média      |   OK   |
| **T15** | Use Cases: CRUD Cultura        | Criar use cases para criar, editar, excluir e listar culturas                                   | Application    | Média      |   OK   |
| **T16** | Validação de CPF/CNPJ          | Implementar validação robusta de CPF/CNPJ no cadastro de produtores                             | Domain         | Alta       |   OK   |
| **T17** | Validação de Área              | Implementar regra: Área Agricultável + Área Vegetação = Área Total                              | Domain         | Alta       |   OK   |
| **T18** | API - Produtor                 | Implementar endpoints REST para CRUD de produtores                                              | Infrastructure | Alta       |   OK   |
| **T19** | API - Fazenda                  | Implementar endpoints REST para CRUD de fazendas                                                | Infrastructure | Alta       |   OK   |
| **T20** | API - Safra                    | Implementar endpoints REST para CRUD de safras                                                  | Infrastructure | Média      |   OK   |
| **T21** | API - Cultura                  | Implementar endpoints REST para CRUD de culturas                                                | Infrastructure | Média      |   OK   |
| **T22** | API - Dashboard                | Endpoint para dashboard: total de fazendas, hectares, filtros por estado, cultura e uso do solo | Infrastructure | Alta       |   OK   |
| **T23** | API Documentation              | Gerar documentação Swagger (OpenAPI) com exemplos de payloads                                   | Infrastructure | Alta       |        |
| **T24** | Logs e Observabilidade         | Implementar logs estruturados, middlewares de request/response e error handling                 | Cross          | Alta       |        |
| **T25** | Testes Unitários - Domain      | Criar testes unitários para entidades e regras de negócio (CPF, Área)                           | Teste          | Alta       |   OK   |
| **T26** | Testes Unitários - Use Cases   | Criar testes unitários para os principais use cases                                             | Teste          | Alta       |   OK   |
| **T27** | Testes de Integração           | Criar testes e2e dos endpoints com banco                                                        | Teste          | Média      |   OK   |
| **T28** | CI Local                       | Configurar CI/CD local com Docker, Docker Compose e GitHub Actions                              | DevOps         | Média      |        |
| **T29** | Readme e Setup                 | Criar README explicando setup, arquitetura e uso da API                                         | Documentação   | Alta       |        |
| **T30** | Refino Final                   | Fazer revisão de código, checagem de Clean Code, SOLID, KISS, validação de contratos e testes   | Refinamento    | Alta       |        |

---

## 🔥 Priorização

1. **T01 → T04:** Setup e arquitetura.
2. **T05 → T09:** Modelagem e domínio, incluindo relacionamentos e regras críticas.
3. **T10 → T13:** Começar pelos use cases e repositórios mais críticos (Produtor e Fazenda).
4. **T16 → T17:** Validar CPF e regra de áreas, que são diferenciais técnicos no desafio.
5. **T18 → T23:** Implementação dos endpoints e dashboard.
6. **T24 → T27:** Observabilidade, testes e validação de qualidade.
7. **T28 → T30:** Acabamento, documentação e empacotamento do projeto.
