/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BASE_URL: string
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
