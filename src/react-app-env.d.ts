/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_DOTV_ENV?: "local" | "stage" | "production";
    readonly REACT_APP_API_URL?: string;
    readonly REACT_APP_LOGIN_AUTHORITY?: string;
  }
}

declare module "*.png" {
  const src: string;
  export default src;
}

interface WebpackRequireContext {
  keys(): string[];
  (id: string): unknown;
}

interface NodeRequire {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ): WebpackRequireContext;
}

