import { ethers } from "ethers";

export type TransactionHistoryType = ethers.providers.TransactionResponse[];

export interface ValidationResult {
  valid: boolean;
  message?: string;
}
