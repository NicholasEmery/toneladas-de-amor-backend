# Requisitos de Software

##  Requisitos Funcionais

### 1. Cadastro de Usuários

1. **RF-01:** O sistema deve permitir o cadastro de acolhidos com os seguintes dados:  
   * Nome  
   * Endereço  
   * Ponto de referência  
   * Documentos (opcional)  
   * Quantidade de pessoas na residência  
   * Situação empregatícia  
   * Histórico de recebimento de cestas básicas

1. **RF-02:** O sistema deve permitir o cadastro de colaboradores com os seguintes dados:  
   * Nome  
   * Endereço  
   * Telefone  
   * Registro de doações realizadas (itens doados, valor doado via Pix ou boleto)

1. **RF-03:** O sistema deve permitir o cadastro de doadores empresariais com os seguintes dados:  
   * Nome da empresa  
   * Endereço  
   * Telefone  
   * Histórico de doações (itens doados e frequência das doações)

### 1.2. Gerenciamento de Doações

1. **RF-04:** O sistema deve permitir o registro de doações recebidas, incluindo:  
   * Tipo de item  
   * Quantidade  
   * Data de validade (se aplicável)  
   * Origem da doação (acolhido, colaborador, doador)

1. **RF-05:** O sistema deve permitir que colaboradores e gerentes monitorem o fluxo de doações, gerando relatórios sobre:  
   * Total de doações recebidas  
   * Histórico de doações por colaborador/doadores  
   * Impacto das doações no estoque

### 1.3. Gestão de Estoque

1. **RF-06:** O sistema deve permitir o cadastro e atualização de produtos no estoque com informações como:  
   * Nome do produto  
   * Quantidade disponível  
   * Data de validade

* **RF-07:** O sistema deve atualizar o estoque automaticamente ao registrar novas doações, refletindo a quantidade atualizada de itens.

* **RF-08:** O sistema deve emitir alertas quando os itens do estoque estiverem em quantidade baixa (definida pelo gerente).

### 1.4. Montagem e Distribuição de Kits

* **RF-09:** O sistema deve permitir a montagem de kits de cestas básicas, com registro detalhado dos itens utilizados e a quantidade de cada um.

* **RF-10:** O sistema deve permitir a criação de uma fila de espera para acolhidos que aguardam doações, priorizando aqueles com maior pontuação ou necessidade.

* **RF-11:** O sistema deve gerenciar uma agenda de entregas, organizando as datas e locais para que os acolhidos recebam os kits.

### 1.5. Relatórios e Monitoramento

* **RF-12:** O sistema deve fornecer relatórios detalhados sobre doações, estoque, entregas realizadas e situação dos acolhidos.

* **RF-13:** O sistema deve registrar e apresentar alertas para doações em atraso ou próximas do vencimento.

## 2\. Requisitos Não Funcionais

### 2.1. Desempenho

* **RNF-01:** O sistema deve ser capaz de suportar até 500 usuários simultâneos sem degradação de desempenho.

* **RNF-02:** O tempo de resposta para a maioria das operações do usuário não deve exceder 2 segundos.

### 2.2. Usabilidade

* **RNF-03:** A interface do usuário deve ser intuitiva e acessível, com uma navegação clara e consistente.

* **RNF-04:** O sistema deve ser responsivo, funcionando corretamente em dispositivos móveis e desktops.

### 2.3. Segurança

* **RNF-05:** O sistema deve implementar autenticação de usuário para acesso a informações sensíveis.

* **RNF-06:** Os dados pessoais dos usuários devem ser armazenados em conformidade com a Lei Geral de Proteção de Dados (LGPD).

### 2.4. Manutenibilidade

* **RNF-07:** O código do sistema deve seguir boas práticas de programação, facilitando a manutenção e futuras atualizações.

* **RNF-08:** A documentação do sistema deve ser mantida atualizada e acessível a todos os desenvolvedores envolvidos no projeto.