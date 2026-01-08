import { EventSource } from "eventsource";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { SSEClient } from "./sse-client";
import { createSSEServer } from "./sse-client.integration.server";

describe("SSEClient integration", () => {
  const port = 4000;
  const url = `http://localhost:${port}/sse`;

  let server: any;
  let sendEvent: (event: string, data: string) => void;
  let closeServer: () => void;

  beforeAll(() => {
    const sse = createSSEServer(port);
    server = sse.server;
    sendEvent = sse.sendEvent;
    closeServer = sse.closeServer;
  });

  afterAll(() => {
    closeServer();
  });

  it("should connect and receive events from real SSE server", async () => {
    const client = new SSEClient(url, {
      eventSourceFactory: (url, options) => new EventSource(url, options),
      heartbeatInterval: 50,
    });

    const messageCb = vi.fn();
    client.subscribe("message", messageCb);

    client.connect();

    await new Promise((resolve) => setTimeout(resolve, 50));
    sendEvent("message", "hello world");

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(messageCb).toHaveBeenCalledWith(
      expect.objectContaining({ data: "hello world" })
    );

    client.disconnect();
  });
});
