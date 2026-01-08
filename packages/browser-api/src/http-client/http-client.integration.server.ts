import express, { Request, Response } from "express";

let currentAccessToken = "access_token_mock";
let refreshCount = 0;

export const createRESTServer = (port: number) => {
  const app = express();
  app.use(express.json());

  // GET
  app.get("/test-get", (req: Request, res: Response): void => {
    const auth = req.headers["authorization"];
    if (!auth) {
      res.status(401).end();
      return;
    }
    if (auth !== `Bearer ${currentAccessToken}`) {
      res.status(401).end();
      return;
    }
    res.json({ success: true });
  });

  // POST
  app.post("/test-post", (req: Request, res: Response): void => {
    const auth = req.headers["authorization"];
    if (!auth || auth !== `Bearer ${currentAccessToken}`) {
      res.status(401).end()
      return;
    };

    res.json({ received: req.body });
  });

  // PUT
  app.put("/test-put", (req: Request, res: Response): void => { res.json({ updated: req.body }); });

  // PATCH
  app.patch("/test-patch", (req: Request, res: Response): void => { res.json({ patched: req.body }); });

  // DELETE
  app.delete("/test-delete", (_req: Request, res: Response): void => { res.json({ deleted: true }); });

  // Refresh token endpoint
  app.post("/auth/refresh", (_req: Request, res: Response) => {
    refreshCount++;
    currentAccessToken = `new_access_token_${refreshCount}`;
    res.json({ accessToken: currentAccessToken, refreshToken: "new_refresh_token" });
  });

  // Timeout endpoint
  app.get("/timeout", (_req, res) => {});

  // Error endpoints
  app.get("/error-400", (_req: Request, res: Response): void => { res.status(400).end(); });
  app.get("/error-403", (_req: Request, res: Response): void => { res.status(403).end(); });
  app.get("/error-404", (_req: Request, res: Response): void => { res.status(404).end(); });
  app.get("/error-500", (_req: Request, res: Response): void => { res.status(500).end(); });

  const server = app.listen(port);

  function closeServer() {
    server.close();
  }

  return { server, closeServer };
};
