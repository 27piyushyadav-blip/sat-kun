// apps/backend/api/src/app.ts
import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { portalPlugin } from "./plugins/portal.js";
import { config } from "@digitaloffices/config";
import { registerHealthRoutes } from "./routes/health.js";

export async function buildApp(): Promise<FastifyInstance> {
  const isDev = config.env === "development";

  const app = Fastify({
    logger: {
      ...(isDev && {
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
      }),
    },
  });

  await app.register(sensible);
  await app.register(helmet);
  await app.register(cors);

  await app.register(registerHealthRoutes, {
    prefix: "/health",
  });

  await app.register(async (api) => {
    await api.register(portalPlugin);

    // TODO: Register API routes
    // await api.register(userRoutes);
    // await api.register(orgRoutes);
  });

  return app;
}
