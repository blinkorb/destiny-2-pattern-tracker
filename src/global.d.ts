declare namespace NodeJS {
  export interface ProcessEnv {
    CLIENT_API_URL: string;
    CLIENT_ID: string;
    CLIENT_API_KEY: string;
  }
}

interface Window {
  updatePatternHashes?: () => void;
}
