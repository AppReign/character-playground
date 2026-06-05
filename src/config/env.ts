import { getDotvEnvConfig } from "./dotvEnv";

/** Game API base URL (no trailing slash). */
export const BASE_API_URL = getDotvEnvConfig().apiUrl;

export { getDotvEnvConfig, resolveDotvEnvironment } from "./dotvEnv";
export type { DotvEnvironment, DotvEnvConfig } from "./dotvEnv";
