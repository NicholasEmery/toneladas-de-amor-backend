# Toneladas de Amor Backend

**Toneladas de Amor Backend** é a aplicação backend desenvolvida com Java utilizando Spring Boot, Maven como gerenciador de dependências, e tem como objetivo fornecer uma API robusta e escalável para o projeto **Toneladas de Amor**.

## Estrutura de Pastas

A estrutura do projeto é organizada da seguinte forma:

```css
toneladas-de-amor-backend/
├── config/  # Configurações, como arquivos de propriedades do Spring Boot.
├── docs/ #  Documentação técnica, como diagramas e requisitos.
├── examples/ # Exemplos de configurações de arquivos .env ou JSON para testes.
├── scripts/  # Scripts úteis para automatizar tarefas (deploy, build etc.).
├── src/   # Código-fonte principal.
├── tests/ # Scripts e casos de teste automatizados.
├── .gitignore
└── README.md
```

## Tecnologias Utilizadas

- **Java**: Linguagem de programação principal.
- **Spring Boot**: Framework para criação de APIs RESTful.
- **Maven**: Gerenciador de dependências e build do projeto.
- **JPA (Java Persistence API)**: Para persistência de dados no banco.
- **MySQL**: Banco de dados relacional utilizado.

## Pré-requisitos

- **Java 17+**: Certifique-se de ter o Java 17 ou versão superior instalado.
- **Maven**: Para gerenciar as dependências e o ciclo de vida do projeto.

## Como Rodar o Projeto

### 1. Clonar o repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/toneladas-de-amor-backend.git
cd toneladas-de-amor-backend
```

### 2. Configurar Banco de Dados

Configure seu banco de dados MySQL no arquivo de propriedades

- Abra o arquivo `src/main/resources/application.properties` e insira suas credenciais de banco de dados.

Exemplo de configuração:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/toneladas_de_amor
spring.datasource.username=root
spring.datasource.password=sua-senha
spring.jpa.hibernate.ddl-auto=update
```

### 3. Construir o Projeto

Execute o comando Maven para compilar e gerar o arquivo `.jar`:

```bash
mvn clean install
```

### 4. Rodar a Aplicação

Após a compilação, você pode rodar a aplicação com o seguinte comando:

```bash
mvn spring-boot:run
```

Ou execute o arquivo JAR gerado:

```bash
java -jar target/toneladas-de-amor-backend-0.0.1-SNAPSHOT.jar
```

O servidor será iniciado no `http//localhost:8000`

### Testes

Para rodar os testes automatizados, execute o seguinte comando:

```bash
mvn test
```

Isso irá executar todos os testes definidos no diretório `tests/`.

### Scripts

O diretório ```scripts/``` contém scripts úteis para automatizar tarefas do dia a dia, como:
- deploy.sh: Para automatizar o processo de deploy.
- build.sh: Para rodar o processo de build do projeto.
- migrate.sh: Para realizar migrações de banco de dados.

### Contribuindo

Por favor, siga as convenções de codificação e mantenha o código bem documentado. Todos os membros da equipe devem revisar e aprovar as pull requests antes de integrar no código principal.
1. Faça um fork deste repositório.
2. Crie uma branch para suas alterações (```git checkout -b minha-nova-funcionalidade```).
3. Faça suas alterações e comite (```git commit -am 'Adiciona nova funcionalidade'```).
4. Envie a branch (```git push origin minha-nova-funcionalidade```).
5. Crie uma pull request para revisão.

### Contato

Para mais informações ou dúvidas, entre em contato com a equipe de desenvolvimento:
- Email da Equipe: sua-equipe@exemplo.com // Ainda vai se alterado
- GitHub da Equipe: https://github.com/seu-usuario // Ainda vai ser alterado