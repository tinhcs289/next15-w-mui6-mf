import { EventSource } from "eventsource";

export type SSECallback = (event: MessageEvent) => void;

export type EventSourceFactory = (url: string, options?: Record<string, string>) => any;

export interface SSEClientOptions {
  heartbeatInterval?: number;
  retryLimit?: number;
  eventSourceOptions?: Record<string, string>;
  eventSourceFactory?: EventSourceFactory;
}

export type SSEConnectionStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "error";

const defaultFactory: EventSourceFactory = (url, options) => {
  return new EventSource(url, options);
}

export class SSEClient {
  private url: string;
  private eventSource: EventSource | null = null;
  private callbacks: Map<string, Set<SSECallback>> = new Map();
  public heartbeatTimer: NodeJS.Timeout | null = null;
  public retryCount = 0;
  public status: SSEConnectionStatus = "disconnected";
  public lastError?: Event;
  public heartbeatInterval: number;
  public retryLimit: number;
  private statusListeners = new Set<() => void>();
  private errorListeners = new Set<() => void>();
  private eventSourceOptions?: Record<string, string>;
  private eventSourceFactory: EventSourceFactory;

  constructor(url: string, options?: SSEClientOptions) {
    this.url = url;
    this.heartbeatInterval = options?.heartbeatInterval ?? 30000;
    this.retryLimit = options?.retryLimit ?? 10;
    this.eventSourceOptions = options?.eventSourceOptions;
    this.eventSourceFactory = options?.eventSourceFactory ?? defaultFactory;
  }

  connect() {
    if (this.eventSource && this.status === "connected") return;
    this.eventSource = this.eventSourceFactory(this.url, this.eventSourceOptions);

    if (!this.eventSource) return;

    this.updateStatus("connecting");

    this.eventSource.onopen = () => {
      this.retryCount = 0;
      this.updateStatus("connected");
      this.startHeartbeat();
      this.registerAllCallbacks();
    };

    this.eventSource.onerror = (err) => {
      this.lastError = err;
      this.emit("error");
      this.retryCount += 1;
      this.updateStatus("error");

      if (this.retryCount > this.retryLimit) {
        this.disconnect();
      }
    };
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.stopHeartbeat();
    this.updateStatus("disconnected");
  }

  subscribe(eventName: string, callback: SSECallback): () => void {
    let cbSet = this.callbacks.get(eventName);
    if (!cbSet) {
      cbSet = new Set();
      this.callbacks.set(eventName, cbSet);
    }
    cbSet.add(callback);

    if (this.eventSource && this.status === "connected") {
      this.eventSource.addEventListener(eventName, callback);
    }

    return () => {
      cbSet!.delete(callback);
      if (this.eventSource) {
        this.eventSource.removeEventListener(eventName, callback);
      }
    };
  }

  private registerAllCallbacks() {
    this.callbacks.forEach((cbSet, eventName) => {
      cbSet.forEach((cb) => {
        this.eventSource?.addEventListener(eventName, cb);
      });
    });
  }

  private startHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => {
      console.debug("SSEClient heartbeat");
    }, this.heartbeatInterval);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private updateStatus(newStatus: SSEConnectionStatus) {
    if (this.status !== newStatus) {
      this.status = newStatus;
      this.emit("status");
    }
  }

  on(event: "status" | "error", handler: () => void) {
    if (event === "status") this.statusListeners.add(handler);
    if (event === "error") this.errorListeners.add(handler);
  }

  off(event: "status" | "error", handler: () => void) {
    if (event === "status") this.statusListeners.delete(handler);
    if (event === "error") this.errorListeners.delete(handler);
  }

  public emit(event: "status" | "error") {
    const listeners =
      event === "status" ? this.statusListeners : this.errorListeners;
    listeners.forEach((cb) => cb());
  }
}
