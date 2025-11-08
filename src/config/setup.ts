import { loadEnvConfig } from "../utils/load-env-config.ts";

const environment = __ENV.ENVIRONMENT || 'env';
loadEnvConfig(environment);