import express from "express";

export function createSSEServer(port: number) {
  const app = express();

  let connections: any[] = [];

  app.get("/sse", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    connections.push(res);

    req.on("close", () => {
      connections = connections.filter((c) => c !== res);
    });
  });

  const server = app.listen(port);

  function sendEvent(event: string, data: string) {
    connections.forEach((res) => {
      res.write(`event: ${event}\ndata: ${data}\n\n`);
    });
  }

  function closeServer() {
    connections.forEach((res) => res.end());
    server.close();
  }

  return { server, sendEvent, closeServer };
}
