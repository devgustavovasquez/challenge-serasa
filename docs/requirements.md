# 📄 **Requisitos Funcionais (RF)**

| Código                                                            | Descrição                                                                                                        |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **RF01**                                                          | Permitir cadastro, edição e exclusão de produtores rurais.                                                       |
| **RF02**                                                          | Permitir cadastro, edição e exclusão de fazendas vinculadas a produtores.                                        |
| **RF03**                                                          | Permitir cadastro, edição e exclusão de safras vinculadas às fazendas.                                           |
| **RF04**                                                          | Permitir cadastro, edição e exclusão de culturas vinculadas às safras.                                           |
| **RF05**                                                          | Validar CPF ou CNPJ no momento do cadastro ou edição do produtor.                                                |
| **RF06**                                                          | Validar que a soma da área agricultável e da área de vegetação não ultrapasse ou exceda a área total da fazenda. |
| **RF07**                                                          | Permitir que um produtor tenha zero, uma ou múltiplas fazendas.                                                  |
| **RF08**                                                          | Permitir que uma fazenda tenha zero, uma ou múltiplas safras.                                                    |
| **RF09**                                                          | Permitir que uma safra tenha zero, uma ou múltiplas culturas.                                                    |
| **RF10**                                                          | Disponibilizar um dashboard com:                                                                                 |
| - **RF10.1** Total de fazendas cadastradas.                       |                                                                                                                  |
| - **RF10.2** Total de hectares registrados (área total).          |                                                                                                                  |
| - **RF10.3** Gráfico por estado (quantidade de fazendas).         |                                                                                                                  |
| - **RF10.4** Gráfico por cultura plantada (quantidade ou área).   |                                                                                                                  |
| - **RF10.5** Gráfico por uso do solo (agricultável vs vegetação). |                                                                                                                  |
| **RF11**                                                          | Permitir a consulta de fazendas e hectares filtrando por: estado, cultura e uso do solo.                         |
| **RF12**                                                          | Implementar logs para rastreabilidade das operações (cadastro, edição, exclusão e consultas).                    |
| **RF13**                                                          | Expor uma API REST documentada com OpenAPI (Swagger).                                                            |

---

# 🔒 **Requisitos Não Funcionais (RNF)**

| Código                                                        | Descrição                                                                                                                                            |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RNF01**                                                     | A API deve ser desenvolvida utilizando **Node.js + TypeScript + NestJS**.                                                                            |
| **RNF02**                                                     | O banco de dados relacional deve ser **PostgreSQL**, com uso de ORM (**Prisma ou TypeORM**).                                                         |
| **RNF03**                                                     | O sistema deve ser containerizado utilizando **Docker** e possuir um ambiente de desenvolvimento reproduzível.                                       |
| **RNF04**                                                     | Deve seguir princípios de arquitetura em camadas, com clara separação de responsabilidades (Domain, Application e Infra).                            |
| **RNF05**                                                     | O código deve seguir padrões de **Clean Code**, **SOLID**, e **KISS**.                                                                               |
| **RNF06**                                                     | As APIs devem ser versionadas e possuir contratos bem definidos (OpenAPI).                                                                           |
| **RNF07**                                                     | O sistema deve ser observável, com logs estruturados e prontos para integração com ferramentas de log (como Loki, Grafana ou ELK).                   |
| **RNF08**                                                     | O sistema deve ser escalável, suportando um número crescente de produtores, fazendas e registros de safra e cultura.                                 |
| **RNF09**                                                     | O sistema deve garantir a integridade dos dados, especialmente nas validações de CPF/CNPJ e nas regras de soma das áreas da fazenda.                 |
| **RNF10**                                                     | Deve possuir testes automatizados cobrindo:                                                                                                          |
| - **RNF10.1** Testes unitários (mínimo 70% de cobertura).     |                                                                                                                                                      |
| - **RNF10.2** Testes de integração para os principais fluxos. |                                                                                                                                                      |
| **RNF11**                                                     | O sistema deve ser seguro contra dados inválidos, SQL Injection e erros comuns de API.                                                               |
| **RNF12**                                                     | A documentação deve ser clara, contendo README, instruções de deploy local com Docker e exemplo de payloads da API.                                  |
| **RNF13**                                                     | O sistema deve ter uma performance adequada, respondendo às requisições em até 500ms para operações padrão de CRUD e consultas simples no dashboard. |
