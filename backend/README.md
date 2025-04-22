## Guia de Instalação e Configuração do Projeto

### Pré-requisitos
Certifique-se de ter os seguintes itens instalados em sua máquina:
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Git](https://git-scm.com/)
- Um gerenciador de pacotes como [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passo a Passo

1. **Clone o repositório**
    ```bash
    git clone https://github.com/NicholasEmery/toneladas-de-amor-backend.git
    cd toneladas-de-amor-backend/backend
    ```

2. **Instale as dependências**
    Com npm:
    ```bash
    npm install
    ```
    Ou com yarn:
    ```bash
    yarn install
    ```

3. **Configure as variáveis de ambiente**
    Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias. Use o arquivo `.env.example` como referência.

4. **Execute as migrações do banco de dados**
    Certifique-se de que o banco de dados está configurado e rodando, então execute:
    ```bash
    npm run migrate
    ```
    Ou:
    ```bash
    yarn migrate
    ```

5. **Inicie o servidor**
    Com npm:
    ```bash
    npm start
    ```
    Ou com yarn:
    ```bash
    yarn start
    ```

6. **Acesse o projeto**
    O servidor estará disponível em `http://localhost:3001` (ou na porta configurada no arquivo `.env`).

### Problemas Comuns
- Certifique-se de que todas as dependências estão instaladas corretamente.
- Verifique se as variáveis de ambiente estão configuradas corretamente.
- Consulte os logs para identificar possíveis erros.

### Suporte
Caso encontre problemas, abra uma [issue](https://github.com/NicholasEmery/toneladas-de-amor-backend/issues) no repositório.
Aqui fica apenas o guia para instalação e configuração do projeto
