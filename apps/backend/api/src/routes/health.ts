import type { FastifyPluginAsync } from "fastify";

export const registerHealthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/", async (req) => {
    return {
      status: "ok",
      portal: req.portal
    };
  });
};
