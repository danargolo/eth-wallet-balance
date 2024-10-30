interface ImportMetaEnv {
  VITE_MATIC_API_KEY: string;
  VITE_ETH_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}