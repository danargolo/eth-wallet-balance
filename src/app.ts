import { ethers } from "ethers";

const apiKeys: Record<string, string> = {
  homestead: import.meta.env.VITE_ETH_API_KEY,
  goerli: "SUA_API_KEY_GOERLI",
  sepolia: "SUA_API_KEY_SEPOLIA",
  arbitrum: "SUA_API_KEY_ARBITRUM",
  "arbitrum-goerli": "SUA_API_KEY_ARBITRUM_GOERLI",
  matic: import.meta.env.VITE_MATIC_API_KEY,
  maticmum: "SUA_API_KEY_MATICMUM",
  optimism: "SUA_API_KEY_OPTIMISM",
  "optimism-goerli": "SUA_API_KEY_OPTIMISM_GOERLI",
};


export function initApp() {
  
  const selectNetwork = document.getElementById("network") as HTMLSelectElement;
  const walletInput = document.getElementById("wallet-address") as HTMLInputElement;
  const balanceDisplay = document.getElementById("balance") as HTMLParagraphElement;
  const transactionsDisplay = document.getElementById("transactions") as HTMLDivElement;
  const checkBalanceButton = document.getElementById("check-balance") as HTMLButtonElement;
  const checkTransactionsButton = document.getElementById("check-transactions") as HTMLButtonElement;
  
  let provider = new ethers.providers.EtherscanProvider((selectNetwork.value), apiKeys[selectNetwork.value]);
  
  selectNetwork.addEventListener("change", () => {
    const apiKey: string = apiKeys[selectNetwork.value];
    provider = new ethers.providers.EtherscanProvider(selectNetwork.value, apiKey);
  })

  
  checkBalanceButton.addEventListener("click", async () => {
    const address = walletInput.value.trim();

    if (!ethers.utils.isAddress(address)) {
      balanceDisplay.textContent = "Endereço inválido!";
      return;
    }
    try {
      const balance = await provider.getBalance(address);
      balanceDisplay.textContent = `Saldo:${ethers.utils.formatEther(balance)} ETH`;

    } catch (error) {
      balanceDisplay.textContent = "Erro ao buscar o saldo.";
      console.error(error);
    }
  });
  checkTransactionsButton.addEventListener("click", async () => {
    const address = walletInput.value.trim();

    if (!ethers.utils.isAddress(address)) {
      transactionsDisplay.textContent = "Endereço inválido!";
      return;
    }
    try {
      const history = await provider.getHistory(address);
      transactionsDisplay.innerHTML = "<h3>Últimas Transações:</h3>";
      history.slice(0, 5).forEach((tx) => {
        const txElement = document.createElement("p");
        txElement.textContent = `De: ${tx.from} Para: ${tx.to}- Valor: 
          ${ethers.utils.formatEther(tx.value)} ETH Data: ${new Date((tx.timestamp ?? 0) * 1000)
            .toLocaleString('pt-BR', {
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit', 
              hour12: false
            }
          )}`;
        transactionsDisplay.appendChild(txElement);
      });
      
    } catch (error) {
      transactionsDisplay.textContent = "Erro ao buscar as transações.";
      console.error(error);
    }
  });
}
