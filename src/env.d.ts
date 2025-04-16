/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly USER_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  Alpine: import('alpinejs').Alpine;
  teamForm: () => void;
}

declare namespace App {
  interface SessionData {
    userId: string;
  }
}
