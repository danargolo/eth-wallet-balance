import { ethers } from "ethers";
import { ValidationResult } from "../types/transactionsTypes";

function validateNotEmpty(key: string): ValidationResult | null {
  return key.trim().length > 0 
    ? null 
    : { valid: false, message: "Endereço não pode estar vazio." };
}

function validateEthereumAddress(key: string): ValidationResult | null {
  return ethers.utils.isAddress(key)
    ? null
    : { valid: false, message: "Endereço Ethereum inválido." };
}

export function validateKey(key: string): ValidationResult {
  const notEmptyResult = validateNotEmpty(key);
  if (notEmptyResult) return notEmptyResult;

  const ethereumResult = validateEthereumAddress(key);
  if (ethereumResult) return ethereumResult;

  return { valid: true };
}
