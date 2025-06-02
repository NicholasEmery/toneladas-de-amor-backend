# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.4](https://github.com/NicholasEmery/api-toneladas-de-amor/compare/v0.0.3...v0.0.4) (2025-06-02)

### [0.0.3](https://github.com/NicholasEmery/api-toneladas-de-amor/compare/v0.0.2...v0.0.3) (2025-06-02)


### Documentação

* atualizar README.md com instruções detalhadas de instalação e configuração; melhorar descrição da API no main.ts ([0ade001](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/0ade0015f10ca817827d1901de0dc32ebb45f36d))


### Refatoração

* ajustar formatação e remover imports não utilizados; adicionar verificação de expiração de OTP ([c0936c6](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/c0936c601cb3ca15c455d303742fb6770981ec30))
* atualizar .gitattributes para forçar finais de linha LF e tratar arquivos binários corretamente ([47f36fb](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/47f36fbfe161ab073a47aae3423f35bfbc06e6ea))
* remover o uso do ValidationPipe e adicionar endpoint para buscar todos os usuários ([db3287b](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/db3287bb361fa1d18cffa67438b408564b4f3e99))
* remover opções de configuração não utilizadas do Swagger ([3f9042f](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/3f9042f858664260f7e31494fc32a62be219feed))
* renomear rotas de obtenção de usuário para maior clareza ([b7ec674](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/b7ec6743062a0750b1643f89c568647b2a4d7651))
* standardize import statements and string quotes across the codebase ([fa2ed55](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/fa2ed5592dfb8702738dcbb5bfa91e8bc9884644))


### Correções

* adicionar nova linha ao final do arquivo prisma.service.ts ([6d03445](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/6d034456007829140a433b9e2abed0c79f3a556a))
* ajustar validação de telefone para 13 dígitos e melhorar tratamento de erros no serviço de usuários ([4778c36](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/4778c367b14f301d2a04c163fa15e954504e011e))
* alterar o método de obtenção de usuário para usar parâmetros em vez de corpo da requisição ([1b46b1c](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/1b46b1cceb3b762a0c00169a8b3bf2918ad91ec4))
* atualizar configuração de cookies para sameSite como "none" em AuthController e EmailResetPasswordController ([3f5cc08](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/3f5cc088edb2d85ecafec85f2de355f09d70f3ea))
* corrigir a escuta do servidor para usar o endereço "0.0.0.0" ([1728310](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/1728310ffbfda6c0f3f70e4a4553d2809ba6fbae))
* corrigir duplicação da dependência @nestjs/cli no package.json ([9fa78e4](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/9fa78e44002ffcc63569fdcfcabd4980020308ad))
* corrigir valor padrão do telefone no CreateUserDto ([3e0a3cb](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/3e0a3cbcf64d92ba8c8537d425c784b36d63e222))
* melhorar tratamento de erros para tokens inválidos no RolesGuard ([a433046](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/a433046e9f0e2d54374da8b4423b97fc51253392))
* mover a dependência @nestjs/cli para devDependencies no package.json ([b1367dd](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/b1367dd2513ed97094c50df591cbc68c5e5e0a3a))
* refatorar a escuta do servidor para usar variável de porta ([efbdf80](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/efbdf80dfe6ef12ff679cba12aac91e4537e2087))
* remover linha em branco do arquivo app.module.ts e ajustar escuta do servidor em main.ts ([755f8f3](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/755f8f36bb1161a2edfdf2bc2dc7e3198b8f8ebd))


### Novas funcionalidades

* adicionar autenticação ao updateUser e deleteUser; refatorar método deleteUser para verificar se o usuário existe ([0b226a6](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/0b226a68bb2f77fcd57818b6a7d1130f5b83b22f))
* adicionar autenticação Bearer e refatorar métodos de logout e refresh token ([4550bfd](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/4550bfd55a7ede41980d2a649cf9e558894d5c0f))
* adicionar campo 'name' ao retorno do signin e remover verificação de role no guard ([63e4b6c](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/63e4b6cff5f11c2a44e48eb0afb1ee8e4838395c))
* adicionar campo CPF nos DTOs de criação de usuário e campos de função ([7b0fb7a](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/7b0fb7a4b05776bf8836392d749b1640efa37119))
* adicionar ConfigModule ao AppModule e atualizar MailServiceVerifiedEmail para logar configurações de e-mail ([92480e1](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/92480e12635337029e6e1577008007c24d201f1b))
* adicionar interceptor para remover senhas de respostas e ajustar a configuração do ESLint ([ff8b782](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/ff8b782152ad4a4e74f06e80f5cd60d40be0907b))
* adicionar método executeQuery ao PrismaService e melhorar tratamento de erro no UserService ([f8f9957](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/f8f99576656aa03ea69fc85e9bda3df066e421c6))
* adicionar modelos de Product e Basket; atualizar User com novos campos e DTOs ([e8036b0](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/e8036b0d709e788814b9ab2814ec47d6ba3e1442))
* adicionar módulo e controlador para busca de usuários; implementar métodos de busca por ID, email, telefone e nome ([3b47663](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/3b47663451d56b32c28de85305cfff632288ab05))
* adicionar módulos de deletar e atualizar usuário com controladores ([d7077f8](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/d7077f88436008b89745e18bb6a4449dbf6b8e90))
* adicionar suporte para desconexão do Prisma e melhorar o tratamento de erros na conexão ([e41be34](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/e41be3432c42783a96f65576f389fe55703a445b))
* alterar rota da documentação de API para "docs" e melhorar verificação da variável de ambiente PORT ([2a1cd74](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/2a1cd74b8264e5ab1dc060a22aec76a12e606cd9))
* atualizar arquivo .env.example com configurações de banco de dados e email ([dcabd6e](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/dcabd6e42b41ebf058d6b2f2c8284283e2b7d97f))
* atualizar AuthController e AuthService para extrair refresh token do header Authorization ([2e653ef](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/2e653efae8f0218147a46072bfb6126f7ab9ae18))
* atualizar UpdateUserDto para incluir telefone e endereço; refatorar método deleteUser para usar ID do usuário ([a9ab934](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/a9ab934824f4e7725c11abd76339846453239f95))
* comentar verificação de email não verificado no processo de login ([14a4dd4](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/14a4dd4a05f7c4d5cdd1c813549d2b01ae577e47))
* configurar o ConfigModule como global no AppModule e AuthModule; remover log de configurações de e-mail no MailServiceVerifiedEmail ([7d3732a](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/7d3732ad80a7e9947e540d80c316bccf8c293c5e))
* enhance payment and user management services with improved error handling and testing ([804e7a8](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/804e7a802db91be12c2c730b9bec15e642377e5b))
* habilitar verificação de email não verificado no processo de login e remover verificações de email e telefone duplicadas na criação de usuários ([fe243d0](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/fe243d0802997762d9aa1eeba1586e4a16635d33))
* implement user creation functionality with distinct roles (UPHELD, DONATOR, COLABORATOR, ADMIN) ([d81447f](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/d81447f46e93c9ced1bd98d15d25fb37ab44422e))
* implementar autenticação com refresh token; atualizar AuthController, AuthService e AuthGuard ([80f76ab](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/80f76ab5446f1aabd72d24da4d459a36ea3d75c0))
* implementar controle e serviço para deletar usuários, incluindo tratamento de erros e DTO ([d345c6c](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/d345c6c2d3d8ae241b29852978095375ac402901))
* implementar serviço, controlador e DTO para gerenciamento de produtos; adicionar testes para ProductService e ProductController ([6592533](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/65925332f87b8df0a720a4edfe68597d87749d14))
* remover campo 'id' do interceptor de remoção de senhas ([68d253e](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/68d253e47cd4f055e137a2570983b86a96b34009))
* remover módulo de produto e adicionar módulo de pagamento com controlador e serviço ([39ed978](https://github.com/NicholasEmery/api-toneladas-de-amor/commit/39ed978d6cda13367460d63ea930a85b0836af9f))

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
