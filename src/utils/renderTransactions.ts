import { ethers } from 'ethers'
import { createPaginationControl } from '../app';
import { TransactionHistoryType } from "../types/transactionsTypes";

export function renderTransactions(transactionHistory: TransactionHistoryType, currentPage: number = 0) {
  const PAGE_SIZE = 5;
  const HISTORY_LENGTH = transactionHistory.length;

  const transactionsDisplay = document.getElementById("transactions") as HTMLDivElement;

  transactionsDisplay.innerHTML = "<h2>Últimas Transações:</h2>";

  const start = currentPage * PAGE_SIZE;
  const paginatedTransactions = transactionHistory.slice(
    start,
    start + PAGE_SIZE
  );

  paginatedTransactions.forEach((tx) => {
    const txElement = document.createElement("p");
    txElement.textContent = `De: ${tx.from} Para: ${tx.to} - Valor: 
      ${ethers.utils.formatEther(tx.value)} ETH 
      Data: ${new Date((tx.timestamp ?? 431492400) * 1000).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}`;
    transactionsDisplay.appendChild(txElement);
  });
  createPaginationControl(currentPage, PAGE_SIZE, HISTORY_LENGTH);
}