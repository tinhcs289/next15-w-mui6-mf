export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
}

export default function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: DebounceOptions = {}
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;
  let lastThis: any;
  let result: ReturnType<T> | undefined;
  let lastInvokeTime = 0;
  let maxWait = options.maxWait || Infinity;
  const { leading = false, trailing = true } = options;

  const invokeFunc = () => {
    const timeSinceLastCall = Date.now() - lastInvokeTime;
    if (timeSinceLastCall < maxWait) return;

    if (!lastArgs) return;
    result = func.apply(lastThis, lastArgs);
    lastArgs = lastThis = undefined;
    lastInvokeTime = Date.now();
    return result;
  };

  const startTimer = () => {
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      if (trailing) {
        invokeFunc();
      }
    }, wait);
  };

  const debounced = function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    lastArgs = args;
    lastThis = this;

    const timeSinceLastCall = Date.now() - lastInvokeTime;
    const shouldCallNow = leading && timeSinceLastCall >= wait;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    startTimer();

    if (shouldCallNow) {
      return invokeFunc();
    }

    return result;
  } as DebouncedFunction<T>;

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = undefined;
    lastArgs = lastThis = undefined;
    lastInvokeTime = 0;
  };

  debounced.flush = () => {
    if (!timeoutId) return result;
    clearTimeout(timeoutId);
    timeoutId = undefined;
    return invokeFunc();
  };

  return debounced;
}
