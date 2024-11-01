import { ethers } from "ethers";

export type TransactionHistory = ethers.providers.TransactionResponse[];

export interface ValidationResult {
  valid: boolean;
  message?: string;
}
