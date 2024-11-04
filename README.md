# Ethereum Wallet Balance

O **Ethereum Wallet Balance** é uma aplicação web que permite aos usuários explorar e consultar informações sobre carteiras Ethereum. Utilizando a biblioteca `ethers.js`, esta ferramenta permite verificar saldos, visualizar histórico de transações e realizar consultas em múltiplas redes, incluindo Ethereum (homestead), Arbitrum, Polygon (Matic) e Optimism.

## Tecnologias Utilizadas

- **Webpack:** Para empacotar o código JavaScript e suas dependências, otimizando a performance da aplicação.
- **TypeScript:** Para garantir a segurança e a robustez do código.
- **ethers.js:** Biblioteca que facilita a interação com a blockchain Ethereum e suas redes relacionadas.

## Funcionalidades

- **Consulta de saldo:** Permite verificar o saldo de uma carteira Ethereum em diferentes redes.
- **Histórico de transações:** Mostra as últimas transações de uma carteira com suporte à paginação.
- **Validação de endereços:** Valida o formato do endereço da carteira antes de realizar consultas.
- **Suporte a múltiplas redes:** Possui suporte para Ethereum (homestead), Arbitrum, Matic (Polygon) e Optimism.

## Instalação

1. Clone o repositório(SSH):
   ```bash
   git clone git@github.com:danargolo/eth-wallet-balance.git
   cd eth-wallet-balance
   ```
2. Instale as dependências: 
    ```bash
    npm install
    ```

3. Crie um arquivo .env na raiz do projeto e adicione suas chaves de API:
    ```bash
      ETH_API_KEY=your_eth_api_key
      ARBITRUM_API_KEY=your_arbitrum_api_key
      MATIC_API_KEY=your_matic_api_key
      OPTMISM_API_KEY=your_optimism_api_key
    ```
4. Inicie o projeto:
    ```bash
    npm start
    ```
5. Acesse a aplicação no seu navegador:

    Abra o navegador e vá para http://localhost:3000

## Uso
- Insira o Endereço da Carteira: Digite o endereço da carteira Ethereum que você deseja consultar.
- Selecione a Rede: Escolha a rede desejada no menu suspenso.
- Consulte o Saldo: Clique no botão "Consultar Saldo" para verificar o saldo disponível na carteira.
- Visualize as Transações: Clique no botão "Ver Transações" para acessar o histórico das últimas transações da carteira.

## Futuras Features/Fixes
- [ ] **Validação e Desativação de Botões:** Implementar lógica para desabilitar os botões "Consultar Saldo" e "Consultar Transações" até que um endereço de carteira válido seja inserido.
- [ ] **Adicionar Loader:** Implementar um loader que será exibido enquanto a aplicação aguarda o retorno da API.
- [ ] **Corrigir Símbolos nas Transações:** Consertar a exibição dos símbolos das moedas nas transações.
- [ ] **Tratamento de Erros Melhorado:** Adicionar mensagens de erro mais especificas e suporte a casos de falhas na rede.
- [ ] **Filtros de Transações:** Implementar funcionalidades que permitam filtrar transações por data ou valor.
- [ ] **Armazenamento de Endereços Favoritos:** Permitir que os usuários salvem endereços favoritos para consultas rápidas.

