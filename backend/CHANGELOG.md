# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.0.2 (2025-04-22)


### Correções

* **env:** corrigir nomes das variáveis de email no arquivo .env.example ([b4de950](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/b4de950214dce7dcb2e1e5b82868b5c20b8d7d16))
* **package:** atualizar nome do projeto para api-toneladas-de-amor ([8e1a1e9](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/8e1a1e98c98928900723e7ea9f9d86d5978af556))


### Novas funcionalidades

* **auth:** adicionar documentação Swagger para o endpoint de login ([aa63f34](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/aa63f34a8ad1d832f3ae73f89213dd62e2420226))
* **auth:** adicionar enum Role e atualizar modelos de usuário e organização ([984a597](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/984a597a7d25f94f578f5dc8465a686158a55c5f))
* **auth:** adicionar propriedades ApiProperty aos DTOs de autenticação e usuário ([babb250](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/babb250531b726adce5be74596ffd20574428089))
* **auth:** adicionar tratamento de erro no logout para tokens inválidos ou expirados ([51150c4](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/51150c428004fd5c5f8cb336b42139ab1c61e3a1))
* **auth:** implement authentication controller with signin and logout functionality ([1a9adaa](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/1a9adaa3e2e6683ab0b51dcb1f1928bd1fd47264))
* **auth:** refatorar injeções de dependência e adicionar validação de DTOs ([5c3e128](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/5c3e128c94c0ab8a6f1dafb56471ab6e319966c1))
* **organization:** implementar módulo, controlador e serviço de organização com operações CRUD ([582c9b4](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/582c9b417fdec48525df85f1e91e26e18626e173))


### Refatoração

* **auth:** melhorar a formatação e a legibilidade das respostas da API no endpoint de login ([2973616](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/29736162a9acaccaec4e7bafe2f47497e24b9072))
* **prisma:** ajustar formatação e remover modelos não utilizados; refatorar campos do modelo User ([b4bccff](https://github.com/NicholasEmery/toneladas-de-amor-backend/commit/b4bccff92bbadb5ee5a32f82db9812bf161fc67a))
