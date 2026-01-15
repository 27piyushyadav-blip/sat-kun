// apps/backend/api/src/plugins/portal.ts
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { config, type Portal } from "@digitaloffices/config";

declare module "fastify" {
  interface FastifyRequest {
    portal: Portal;
  }
}

const portalPluginCallback: FastifyPluginAsync = async (app) => {
  app.addHook("onRequest", async (req) => {
    const hostHeader = req.headers.host;

    if (!hostHeader) {
      app.log.warn("Missing Host header");
      throw app.httpErrors.badRequest("Host header missing");
    }

    const hostname = hostHeader.split(":")[0] ?? "";
    const portal = config.domains[hostname];

    if (!portal) {
      app.log.warn({ hostname }, "Unknown domain");
      throw app.httpErrors.forbidden("Invalid domain");
    }

    req.portal = portal;
  });
};

export const portalPlugin = fp(portalPluginCallback);
