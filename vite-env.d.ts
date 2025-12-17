/// <reference types="vite/client" />

interface ImportMeta {
  glob(pattern: string | string[]): Record<string, () => Promise<any>>;
}

declare const wp: {
  domReady?: (callback: () => void) => void;
} | undefined;

