interface ImportMetaEnv {
  VITE_SEPOLIA_API_KEY: string;
  VITE_OPTMISM_API_KEY: string;
  VITE_ARBITRUM_API_KEY: string;
  VITE_MATIC_API_KEY: string;
  VITE_ETH_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}