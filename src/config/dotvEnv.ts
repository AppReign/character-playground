export type DotvEnvironment = "local" | "stage" | "production";

export type DotvEnvConfig = {
  env: DotvEnvironment;
  apiUrl: string;
  loginAuthority: string;
  oidcClientId: string;
  oidcRedirectUri: string;
};

const DEFAULTS = {
  stageApi: "https://api-stage.dragonsofthevoid.com",
  prodApi: "https://api.dragonsofthevoid.com",
  stageLogin: "https://login-stage.dragonsofthevoid.com",
  prodLogin: "https://login.dragonsofthevoid.com",
  stageCreatorHost: "https://creator-stage.dragonsofthevoid.com",
  prodCreatorHost: "https://creator.dragonsofthevoid.com"
} as const;

function readExplicitEnv(): DotvEnvironment | null {
  const value = process.env.REACT_APP_DOTV_ENV?.trim().toLowerCase();
  if (value === "local" || value === "stage" || value === "production") {
    return value;
  }
  return null;
}

/** Resolved once at startup in the browser bundle. */
export function resolveDotvEnvironment(): DotvEnvironment {
  const explicit = readExplicitEnv();
  if (explicit) {
    return explicit;
  }

  if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
    return window.location.href.includes("stage") ? "stage" : "production";
  }

  return "local";
}

function localRedirectUri(): string {
  const publicUrl = process.env.PUBLIC_URL || "";
  const base = publicUrl.endsWith("/") ? publicUrl.slice(0, -1) : publicUrl;
  return `${window.location.origin}${base}/callback.html`;
}

function isLocalDevHost(): boolean {
  if (typeof window === "undefined") {
    return process.env.NODE_ENV === "development";
  }
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

function localOidcSettings(): Pick<DotvEnvConfig, "oidcClientId" | "oidcRedirectUri"> {
  return {
    oidcClientId: "dotv-creator-local",
    oidcRedirectUri:
      typeof window !== "undefined"
        ? localRedirectUri()
        : "http://localhost:3000/callback.html"
  };
}

function buildConfig(env: DotvEnvironment): DotvEnvConfig {
  const apiOverride = process.env.REACT_APP_API_URL?.trim();
  const loginOverride = process.env.REACT_APP_LOGIN_AUTHORITY?.trim();
  const localOidc = isLocalDevHost() ? localOidcSettings() : null;

  switch (env) {
    case "local":
      return {
        env,
        apiUrl: apiOverride || DEFAULTS.stageApi,
        loginAuthority: loginOverride || DEFAULTS.stageLogin,
        ...(localOidc ?? localOidcSettings())
      };
    case "stage":
      return {
        env,
        apiUrl: apiOverride || DEFAULTS.stageApi,
        loginAuthority: loginOverride || DEFAULTS.stageLogin,
        ...(localOidc ?? {
          oidcClientId: "dotv-creator-stage",
          oidcRedirectUri: `${DEFAULTS.stageCreatorHost}/callback.html`
        })
      };
    case "production":
      return {
        env,
        apiUrl: apiOverride || DEFAULTS.prodApi,
        loginAuthority: loginOverride || DEFAULTS.prodLogin,
        oidcClientId: "dotv-creator",
        oidcRedirectUri: `${DEFAULTS.prodCreatorHost}/callback.html`
      };
  }
}

let cachedConfig: DotvEnvConfig | null = null;

export function getDotvEnvConfig(): DotvEnvConfig {
  if (!cachedConfig) {
    cachedConfig = buildConfig(resolveDotvEnvironment());
    if (process.env.NODE_ENV === "development") {
      console.info("[creator] environment", cachedConfig);
    }
  }
  return cachedConfig;
}

export function resetDotvEnvConfigForTests(): void {
  cachedConfig = null;
}
