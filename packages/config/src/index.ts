// packages/config/src/index.ts
import { loadEnv, type Env } from "./env.js";
import { DOMAIN_PORTAL_MAP } from "./portal.js";

// Lazy load env to allow catching errors in the app
let _env: Env | undefined;
function getEnv() {
  if (!_env) {
    _env = loadEnv();
  }
  return _env;
}

export const config = {
  get env() {
    return getEnv().NODE_ENV;
  },
  get port() {
    return getEnv().PORT;
  },
  get host() {
    return getEnv().HOST;
  },
  domains: DOMAIN_PORTAL_MAP,
} as const;

export type { Portal } from "./portal.js";
export { ConfigError } from "./env.js"; // Export the error for the app to use
