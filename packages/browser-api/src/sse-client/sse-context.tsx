"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import {
  SSECallback,
  SSEClient,
  SSEClientOptions,
  SSEConnectionStatus,
} from "./sse-client";

export type SSEContextValues = {
  connect: () => void;
  disconnect: () => void;
  subscribe: (eventName: string, callback: SSECallback) => () => void;
  status: SSEConnectionStatus;
  lastError?: Event;
  client: SSEClient;
};

const SSEContext = createContext<SSEContextValues>(
  undefined as unknown as SSEContextValues
);

export function useSSE() {
  const context = useContext(SSEContext);
  if (!context) throw new Error("useSSE must be used within SSEProvider");
  return context;
}

export type SSEProviderProps = PropsWithChildren<{
  url: string;
  clientOptions?: SSEClientOptions;
}>;

export function SSEProvider({
  url,
  clientOptions,
  children,
}: SSEProviderProps) {
  const clientRef = useRef(new SSEClient(url, clientOptions));
  const client = clientRef.current;

  const status = useSyncExternalStore(
    (onStoreChange) => {
      const handler = () => onStoreChange();
      client.on("status", handler);
      return () => client.off("status", handler);
    },
    () => client.status
  );

  const lastError = useSyncExternalStore(
    (onStoreChange) => {
      const handler = () => onStoreChange();
      client.on("error", handler);
      return () => client.off("error", handler);
    },
    () => client.lastError
  );

  const connect = useCallback(() => {
    client.connect();
  }, [client]);

  const disconnect = useCallback(() => {
    client.disconnect();
  }, [client]);

  const subscribe = useCallback(
    (eventName: string, callback: SSECallback) => {
      return client.subscribe(eventName, callback);
    },
    [client]
  );

  const contextValue: SSEContextValues = {
    connect,
    disconnect,
    subscribe,
    status,
    lastError,
    client,
  };

  return (
    <SSEContext.Provider value={contextValue}>{children}</SSEContext.Provider>
  );
}

import { useEffect, useState } from "react";

export type MessageDataParser<T> = (event: MessageEvent) => T;

const defaultMessageParser: MessageDataParser<any> = (e) => {
  try {
    return JSON.parse(e.data);
  } catch {
    return undefined;
  }
};

/**
 * Subcribe for a type of event, un-subcribe on un-mount automatically.
 * @example
  const MyChat = () => {
    const messages = useSSEEvent<{ user: string; text: string }>("chat");

    return (
      <ul>
        {messages.map((m, i) => (
          <li key={i}>
            <strong>{m.user}</strong>: {m.text}
          </li>
        ))}
      </ul>
    );
  };
 */
export function useSSEEvent<T = any>(
  eventName: string,
  parser: MessageDataParser<T> = defaultMessageParser
): {
  messages: T[];
  latestMessage?: T;
} {
  const { subscribe, status } = useSSE();
  const [messages, setMessages] = useState<T[]>([]);

  const latestMessage = useMemo(
    () => (messages.length === 0 ? messages[0] : messages[messages.length - 1]),
    [messages]
  );

  useEffect(() => {
    if (status !== "connected") return;

    const unsubscribe = subscribe(eventName, (event) => {
      const parsed = parser(event);
      if (parsed !== undefined) {
        setMessages((prev) => [...prev, parsed]);
      }
    });

    return unsubscribe;
  }, [eventName, subscribe, parser, status]);

  return { latestMessage, messages };
}
