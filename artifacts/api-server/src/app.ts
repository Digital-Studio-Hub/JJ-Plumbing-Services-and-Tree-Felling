import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import { existsSync } from "fs";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// In production, serve the compiled React frontend and fall back to index.html
// for client-side routing. The Dockerfile copies the Vite build output to
// ./public/ relative to the container's WORKDIR.
if (process.env["NODE_ENV"] === "production") {
  const publicDir = path.resolve(process.cwd(), "public");
  if (existsSync(publicDir)) {
    app.use(express.static(publicDir));
    // app.get("*", ...) throws in Express v5 / path-to-regexp v8.
    // app.use() with no path is a safe catch-all for SPA fallback.
    app.use((_req, res) => {
      res.sendFile(path.join(publicDir, "index.html"));
    });
  }
}

export default app;
