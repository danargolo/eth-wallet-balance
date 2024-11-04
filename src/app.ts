import { ethers } from "ethers";
import { validateKey } from "./utils/validateKey";
import { TransactionHistoryType } from "./types/transactionsTypes";
import { renderTransactions } from "./utils/renderTransactions";

interface NetworkConfig {
  apiKey?: string;
  symbol: string;
}

const apiKeys: Record<string, NetworkConfig> = {
  homestead: {
    apiKey: process.env.ETH_API_KEY,
    symbol: "ETH",
  },
  sepolia: {
    symbol: "ETH",
  },
  arbitrum: {
    apiKey: process.env.ARBITRUM_API_KEY,
    symbol: "ETH",
  },
  matic: {
    apiKey: process.env.MATIC_API_KEY,
    symbol: "MATIC",
  },
  optimism: {
    apiKey: process.env.OPTMISM_API_KEY,
    symbol: "ETH",
  },
};

let transactionHistory: TransactionHistoryType = [];

export function createPaginationControl(currentPage: number, pageSize: number, historyLength: number) {
  const paginationControl = document.getElementById('transactions-result') as HTMLDivElement;
  const prevButton = document.getElementById('prevButton') as HTMLButtonElement;
  const nextButton = document.getElementById('nextButton') as HTMLButtonElement;

  if (historyLength > pageSize) {
    paginationControl.style.display = "block";
  } else {
    paginationControl.style.display = "none";
  }

  prevButton.disabled = currentPage === 0;
  prevButton.onclick = () => {
    currentPage--;
    renderTransactions(transactionHistory, currentPage);
  };

  nextButton.disabled = (currentPage + 1) * pageSize >= historyLength;
  nextButton.onclick = () => {
    currentPage++;
    renderTransactions(transactionHistory, currentPage);
  };
};

export function initApp() {
  const selectNetwork = document.getElementById("network") as HTMLSelectElement;
  const walletInput = document.getElementById("wallet-address") as HTMLInputElement;
  const balanceDisplay = document.getElementById("balance") as HTMLParagraphElement;
  const errorDisplay = document.getElementById("error") as HTMLParagraphElement;
  const checkBalanceButton = document.getElementById("check-balance") as HTMLButtonElement;
  const checkTransactionsButton = document.getElementById("check-transactions") as HTMLButtonElement;

  let provider = new ethers.providers.EtherscanProvider(
    selectNetwork.value,
    apiKeys[selectNetwork.value].apiKey
  );

  function getAddressInput(): string {
    return walletInput.value.trim();
  }

  walletInput.addEventListener("change", () => {
    const address = getAddressInput();

    const validationResult = validateKey(address);

    if (!validationResult.valid) {
      errorDisplay.textContent =
        validationResult.message ?? "Erro desconhecido.";
      errorDisplay.style.display = "block";
    } else {
      errorDisplay.style.display = "none";
    }
  });

  selectNetwork.addEventListener("change", () => {
    const apiKey: string | undefined = apiKeys[selectNetwork.value].apiKey;
    provider = apiKey
    ? new ethers.providers.EtherscanProvider(selectNetwork.value, apiKey)
    : new ethers.providers.EtherscanProvider(selectNetwork.value);
  });

  checkBalanceButton.addEventListener("click", async () => {
    const address = getAddressInput();

    try {
      const balance = await provider.getBalance(address);
      balanceDisplay.textContent = `${ethers.utils.formatEther(
        balance
      )} ${apiKeys[selectNetwork.value].symbol}`;
    } catch (error) {
      errorDisplay.textContent = "Erro ao buscar o saldo.";
      console.error(error);
    }
  });

  async function loadTransactions(address: string) {
    try {
      transactionHistory = await provider.getHistory(address);
      renderTransactions(transactionHistory);
    } catch (error) {
      errorDisplay.textContent = "Erro ao buscar as transações.";
      console.error(error);
    }
  }

  checkTransactionsButton.addEventListener("click", async () => {
    const address = getAddressInput();
    await loadTransactions(address);
  });
}
