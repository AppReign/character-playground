/// <reference types="react-scripts" />

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

