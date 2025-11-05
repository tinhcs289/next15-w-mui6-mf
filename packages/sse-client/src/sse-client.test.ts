import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EventSourceFactory, SSEClient } from "./sse-client";

class MockEventSource {
  static instances: MockEventSource[] = [];

  url: string;
  options: any;
  onopen: (() => void) | null = null;
  onerror: ((err?: any) => void) | null = null;
  closed = false;

  private listeners: Record<string, Set<Function>> = {};

  constructor(url: string, options?: any) {
    this.url = url;
    this.options = options;
    MockEventSource.instances.push(this);
  }

  addEventListener(eventName: string, cb: Function) {
    if (!this.listeners[eventName]) this.listeners[eventName] = new Set();
    this.listeners[eventName].add(cb);
  }

  removeEventListener(eventName: string, cb: Function) {
    this.listeners[eventName]?.delete(cb);
  }

  emitEvent(eventName: string, data?: any) {
    this.listeners[eventName]?.forEach((cb) => cb({ data }));
  }

  triggerOpen() {
    this.onopen?.();
  }

  triggerError(err?: any) {
    this.onerror?.(err);
  }

  close() {
    this.closed = true;
  }
}

const mockEventSourceFactory: EventSourceFactory = (url, options) =>
  new MockEventSource(url, options);

describe("SSEClient", () => {
  beforeEach(() => {
    MockEventSource.instances = [];
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should initialize with default options then connect and set status to connected", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory
    });
    expect(client.status).toBe("disconnected");
    expect(client.retryLimit).toBe(10);
    expect(client.heartbeatInterval).toBe(30000);

    client.connect();
    expect(client.status).toBe("connecting");
    expect(MockEventSource.instances.length).toBe(1);

    MockEventSource.instances[0].triggerOpen();
    expect(client.status).toBe("connected");
    expect(client["retryCount"]).toBe(0);
    expect(client["heartbeatTimer"]).not.toBeNull();
  });

  it("should handle error and increase retryCount", () => {
    const client = new SSEClient("http://test", {
      retryLimit: 2,
      eventSourceFactory: mockEventSourceFactory,
    });
    client.connect();

    const es = MockEventSource.instances[0];
    expect(client.status).toBe("connecting");

    es.triggerError(new Error("fail1"));
    expect(client.status).toBe("error");
    expect(client["retryCount"]).toBe(1);
    expect(client.lastError).toBeInstanceOf(Error);

    es.triggerError(new Error("fail2"));
    es.triggerError(new Error("fail3"));
    expect(client["retryCount"]).toBe(3);
    expect(client.status).toBe("disconnected");
    expect(es.closed).toBe(true);
  });

  it("should subscribe and unsubscribe event callbacks", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory,
    });
    client.connect();
    const es = MockEventSource.instances[0];
    es.triggerOpen();

    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const unsubscribe1 = client.subscribe("message", callback1);
    client.subscribe("message", callback2);

    es.emitEvent("message", "data1");
    expect(callback1).toHaveBeenCalledWith(
      expect.objectContaining({ data: "data1" })
    );
    expect(callback2).toHaveBeenCalledWith(
      expect.objectContaining({ data: "data1" })
    );

    unsubscribe1();
    es.emitEvent("message", "data2");
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(2);
  });

  it("should start and stop heartbeat", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory,
      heartbeatInterval: 1000,
    });
    client.connect();
    const es = MockEventSource.instances[0];
    es.triggerOpen();

    expect(client["heartbeatTimer"]).not.toBeNull();
    vi.advanceTimersByTime(3000);
    expect(client["heartbeatTimer"]).not.toBeNull();

    client.disconnect();
    expect(client["heartbeatTimer"]).toBeNull();
  });

  it("should allow status and error listeners", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory,
      retryLimit: 2,
    });

    const statusCb = vi.fn();
    const errorCb = vi.fn();

    client.on("status", statusCb);
    client.on("error", errorCb);

    client.connect();
    const es = MockEventSource.instances[0];

    expect(client.status).toBe("connecting");

    es.triggerOpen();
    expect(client.status).toBe("connected");

    es.triggerError(new Error("fail"));
    expect(client.status).toBe("error");
    expect(errorCb).toHaveBeenCalledTimes(1);

    es.triggerError(new Error("fail2"));
    es.triggerError(new Error("fail3"));
    expect(client.status).toBe("disconnected");

    expect(statusCb).toHaveBeenCalledTimes(4);

    expect(errorCb).toHaveBeenCalledTimes(3);

    client.off("status", statusCb);
    client.off("error", errorCb);

    es.triggerError(new Error("fail4"));
    expect(statusCb).toHaveBeenCalledTimes(4);
    expect(errorCb).toHaveBeenCalledTimes(3);
  });

  it("should not reconnect automatically beyond retryLimit", () => {
    const client = new SSEClient("http://test", {
      retryLimit: 1,
      eventSourceFactory: mockEventSourceFactory,
    });
    client.connect();
    const es = MockEventSource.instances[0];

    es.triggerError(new Error("fail1"));
    expect(client.status).toBe("error");
    expect(client["retryCount"]).toBe(1);

    es.triggerError(new Error("fail2"));
    expect(client.status).toBe("disconnected");
    expect(es.closed).toBe(true);
  });

  it("should handle multiple connect calls gracefully", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory,
    });
    client.connect();
    const es = MockEventSource.instances[0];
    es.triggerOpen();

    client.connect();
    expect(MockEventSource.instances.length).toBe(1);
  });

  it("should disconnect correctly", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory,
    });
    client.connect();
    const es = MockEventSource.instances[0];
    es.triggerOpen();

    client.disconnect();
    expect(client.status).toBe("disconnected");
    expect(es.closed).toBe(true);
    expect(client["heartbeatTimer"]).toBeNull();
  });

  it("should register callbacks on open if subscribed before connect", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory,
    });
    const callback = vi.fn();
    client.subscribe("message", callback);
    client.connect();
    const es = MockEventSource.instances[0];
    es.triggerOpen();

    es.emitEvent("message", "data");
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ data: "data" })
    );
  });

  it("should handle multiple different event types", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory,
    });

    const callbackMessage = vi.fn();
    const callbackUpdate = vi.fn();

    client.subscribe("message", callbackMessage);
    client.subscribe("update", callbackUpdate);

    client.connect();
    const es = MockEventSource.instances[0];
    es.triggerOpen();

    es.emitEvent("message", "msgData");
    es.emitEvent("update", "updateData");

    expect(callbackMessage).toHaveBeenCalledWith(
      expect.objectContaining({ data: "msgData" })
    );
    expect(callbackUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ data: "updateData" })
    );
  });

  it("should remove callback from internal map after unsubscribe", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory,
    });

    const callback = vi.fn();
    const unsubscribe = client.subscribe("message", callback);

    expect(client["callbacks"].get("message")?.has(callback)).toBe(true);

    unsubscribe();
    expect(client["callbacks"].get("message")?.has(callback)).toBe(false);
  });

  it("should allow reconnect after disconnect without creating extra EventSource", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory,
      retryLimit: 2,
    });

    client.connect();
    const es1 = MockEventSource.instances[0];
    es1.triggerOpen();

    client.disconnect();
    expect(client.status).toBe("disconnected");
    expect(es1.closed).toBe(true);

    client.connect();
    const es2 = MockEventSource.instances[1];
    expect(es2).toBeDefined();
    expect(MockEventSource.instances.length).toBe(2);
    expect(client.status).toBe("connecting");

    es2.triggerOpen();
    expect(client.status).toBe("connected");
  });

  it("should handle unsubscribe even if EventSource is not yet connected", () => {
    const client = new SSEClient("http://test", {
      eventSourceFactory: mockEventSourceFactory,
    });

    const callback = vi.fn();
    const unsubscribe = client.subscribe("message", callback);

    unsubscribe();

    client.connect();
    const es = MockEventSource.instances[0];
    es.triggerOpen();

    es.emitEvent("message", "data");
    expect(callback).not.toHaveBeenCalled();
  });
});
