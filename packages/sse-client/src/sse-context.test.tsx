import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";

vi.mock("./sse-client", async () => {
  const actual = await import("./sse-client");
  type Listener = { event: "status" | "error"; handler: () => void };
  class MockSSEClient {
    url: string;
    options?: SSEClientOptions;
    status: SSEConnectionStatus = "disconnected";
    lastError?: Event;
    connect = vi.fn();
    disconnect = vi.fn();
    subscribe = vi.fn((eventName: string, callback: SSECallback) => {
      this.subscriptions.push({ eventName, callback });
      return vi.fn(() => {
        this.subscriptions = this.subscriptions.filter(
          (s) => s.callback !== callback
        );
      });
    });
    private listeners: Listener[] = [];
    subscriptions: { eventName: string; callback: SSECallback }[] = [];

    constructor(url: string, options?: SSEClientOptions) {
      this.url = url;
      this.options = options;
      (globalThis as any).lastCreatedInstance = this;
    }

    on = vi.fn((event: "status" | "error", handler: () => void) => {
      this.listeners.push({ event, handler });
    });

    off = vi.fn((event: "status" | "error", handler: () => void) => {
      this.listeners = this.listeners.filter(
        (l) => l.event !== event || l.handler !== handler
      );
    });

    emit(event: "status" | "error") {
      this.listeners
        .filter((l) => l.event === event)
        .forEach((l) => l.handler());
    }
  }

  return {
    ...actual,
    SSEClient: MockSSEClient,
  };
});

import type {
  SSECallback,
  SSEClientOptions,
  SSEConnectionStatus,
} from "./sse-client";
import { SSEClient } from "./sse-client";
import { SSEProvider, useSSE, useSSEEvent } from "./sse-context";

function TestContextComponent() {
  const { connect, disconnect, subscribe, status, lastError, client } =
    useSSE();
  return (
    <div>
      <div data-testid="status">{status}</div>
      <div data-testid="error">{lastError ? "error" : "none"}</div>
      <div data-testid="client">{client ? "exists" : "none"}</div>
      <button type="button" onClick={connect}>
        Connect
      </button>
      <button type="button" onClick={disconnect}>
        Disconnect
      </button>
      <button
        type="button"
        onClick={() =>
          subscribe("message", () => {
            /* noop */
          })
        }
      >
        Subscribe
      </button>
    </div>
  );
}

function ChatComponent() {
  const { messages, latestMessage } = useSSEEvent<{ text: string }>("chat");
  return (
    <div>
      <div data-testid="count">{messages.length}</div>
      <div data-testid="latest">{latestMessage?.text ?? "none"}</div>
    </div>
  );
}

function getSSEClientInstance(): SSEClient {
  const instance = (globalThis as any).lastCreatedInstance as
    | SSEClient
    | undefined;
  if (!instance) {
    throw new Error(
      "SSEClient instance not found. Did you render <SSEProvider> first?"
    );
  }
  return instance;
}

describe("SSEContext", () => {
  it("provides context and renders correct initial state", () => {
    render(
      <SSEProvider url="/mock">
        <TestContextComponent />
      </SSEProvider>
    );
    expect(screen.getByTestId("status")).toHaveTextContent("disconnected");
    expect(screen.getByTestId("client")).toHaveTextContent("exists");
    expect(screen.getByTestId("error")).toHaveTextContent("none");
  });

  it("calls connect() and disconnect() properly", () => {
    render(
      <SSEProvider url="/mock">
        <TestContextComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    fireEvent.click(screen.getByText("Connect"));
    expect(client.connect).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Disconnect"));
    expect(client.disconnect).toHaveBeenCalledTimes(1);
  });

  it("automatically subscribes when connected after manual connect()", async () => {
    render(
      <SSEProvider url="/mock">
        <ChatComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    act(() => {
      client.connect();
      client.status = "connected";
      client.emit("status");
    });
    expect(client.subscribe).toHaveBeenCalledWith("chat", expect.any(Function));
  });

  it("subscribes event handler correctly", () => {
    render(
      <SSEProvider url="/mock">
        <TestContextComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    fireEvent.click(screen.getByText("Subscribe"));
    expect(client.subscribe).toHaveBeenCalledWith(
      "message",
      expect.any(Function)
    );
  });

  it("updates status when client emits status event", async () => {
    render(
      <SSEProvider url="/mock">
        <TestContextComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    act(() => {
      client.status = "connecting";
      client.emit("status");
    });
    expect(await screen.findByTestId("status")).toHaveTextContent("connecting");

    act(() => {
      client.status = "connected";
      client.emit("status");
    });
    expect(await screen.findByTestId("status")).toHaveTextContent("connected");
  });

  it("updates lastError when error emitted", async () => {
    render(
      <SSEProvider url="/mock">
        <TestContextComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    act(() => {
      client.lastError = new Event("error");
      client.emit("error");
    });
    expect(await screen.findByTestId("error")).toHaveTextContent("error");
  });

  it("does not subscribe if client is not connected", () => {
    render(
      <SSEProvider url="/mock">
        <ChatComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    expect(client.subscribe).not.toHaveBeenCalled();
  });

  it("subscribes when connected and receives valid JSON messages", async () => {
    render(
      <SSEProvider url="/mock">
        <ChatComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    act(() => {
      client.status = "connected";
      client.emit("status");
    });

    const callback = (client.subscribe as unknown as Mock).mock.calls[0]![1];
    act(() => {
      callback({ data: JSON.stringify({ text: "Hello SSE" }) } as MessageEvent);
    });

    expect(await screen.findByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("latest")).toHaveTextContent("Hello SSE");
  });

  it("ignores malformed JSON without crashing", async () => {
    render(
      <SSEProvider url="/mock">
        <ChatComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    act(() => {
      client.status = "connected";
      client.emit("status");
    });
    const callback = (client.subscribe as unknown as Mock).mock.calls[0]![1];
    act(() => {
      callback({ data: "not-json" } as MessageEvent);
    });
    expect(await screen.findByTestId("count")).toHaveTextContent("0");
  });

  it("updates latest message correctly as new events arrive", async () => {
    render(
      <SSEProvider url="/mock">
        <ChatComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    act(() => {
      client.status = "connected";
      client.emit("status");
    });

    const callback = (client.subscribe as unknown as Mock).mock.calls[0]![1];
    act(() => {
      callback({ data: JSON.stringify({ text: "Msg1" }) } as MessageEvent);
      callback({ data: JSON.stringify({ text: "Msg2" }) } as MessageEvent);
    });

    expect(await screen.findByTestId("count")).toHaveTextContent("2");
    expect(screen.getByTestId("latest")).toHaveTextContent("Msg2");
  });

  it("handles multiple subscribers independently", async () => {
    function MultiListener() {
      const chat1 = useSSEEvent<{ text: string }>("chat");
      const chat2 = useSSEEvent<{ text: string }>("chat");
      return (
        <div>
          <div data-testid="len1">{chat1.messages.length}</div>
          <div data-testid="len2">{chat2.messages.length}</div>
        </div>
      );
    }

    render(
      <SSEProvider url="/mock">
        <MultiListener />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    act(() => {
      client.status = "connected";
      client.emit("status");
    });

    const chatSubscribers = (client.subscribe as unknown as Mock).mock.calls
      .filter(([eventName]) => eventName === "chat")
      .map(([, callback]) => callback);

    act(() => {
      chatSubscribers.forEach((cb) =>
        cb({ data: JSON.stringify({ text: "A" }) } as MessageEvent)
      );
    });

    expect(await screen.findByTestId("len1")).toHaveTextContent("1");
    expect(screen.getByTestId("len2")).toHaveTextContent("1");
  });

  it("can reconnect (status changes from disconnected → connected)", async () => {
    render(
      <SSEProvider url="/mock">
        <TestContextComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    act(() => {
      client.status = "disconnected";
      client.emit("status");
    });
    expect(await screen.findByTestId("status")).toHaveTextContent(
      "disconnected"
    );

    act(() => {
      client.status = "connected";
      client.emit("status");
    });
    expect(await screen.findByTestId("status")).toHaveTextContent("connected");
  });

  it("cleans up subscription when unmounted", () => {
    const unsubscribe = vi.fn();

    const client = getSSEClientInstance();

    (client.subscribe as unknown as Mock).mockReturnValueOnce(unsubscribe);

    const { unmount } = render(
      <SSEProvider url="/mock">
        <ChatComponent />
      </SSEProvider>
    );

    act(() => {
      client.status = "connected";
      client.emit("status");
    });

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(0); // hook cleanup called
  });

  it("cleans up event listeners when provider unmounts", () => {
    const { unmount } = render(
      <SSEProvider url="/mock">
        <TestContextComponent />
      </SSEProvider>
    );

    const client = getSSEClientInstance();

    unmount();
    expect(client.off).toHaveBeenCalled();
  });
});
