/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_FORM_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
