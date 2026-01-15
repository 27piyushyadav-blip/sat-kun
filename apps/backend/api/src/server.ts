// apps/backend/api/src/server.ts
import { config, ConfigError } from "@digitaloffices/config";
import { buildApp } from "./app.js";

async function start() {
  try {
    // Accessing config properties triggers loadEnv().
    // We do this inside the try block to catch ConfigError.
    const PORT = config.port;
    const HOST = config.host;

    const app = await buildApp();

    try {
      await app.listen({ port: PORT, host: HOST });
      app.log.info(`API server running on http://${HOST}:${PORT}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }

    const shutdown = async (signal: string) => {
      app.log.info({ signal }, "Shutting down server...");
      await app.close();
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    if (err instanceof ConfigError) {
      console.error("\n❌ Configuration Error:");
      console.error(JSON.stringify(err.errors, null, 2));
      process.exit(1);
    }
    // Re-throw unexpected errors
    throw err;
  }
}

start();
