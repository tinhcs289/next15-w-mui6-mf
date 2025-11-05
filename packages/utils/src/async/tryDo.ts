/**
 * A helper function to simplify error handling with async/await.
 *
 * Instead of using try/catch, `tryDo` wraps a Promise and returns a tuple
 * where the first value is an error (if any), and the second is the result.
 * This makes error handling more concise and avoids deeply nested try/catch blocks.
 *
 * If the Promise resolves successfully, `error` will be `null` and `result` will contain the value.
 * If the Promise is rejected, `error` will contain the error (converted to an `Error` object if needed),
 * and `result` will be `null`.
 *
 * @typeParam R - The expected result type of the Promise.
 * @typeParam E - The expected error type (optional).
 *
 * @param prom - The Promise to execute.
 * @returns A Promise resolving to a tuple `[error, result]`.
 *
 * @example
 * ```ts
 * const [error, user] = await tryDo(getUser(id));
 * if (error) {
 *   console.error("Failed to get user:", error);
 *   return;
 * }
 * console.log("User data:", user);
 * ```
 *
 * @author {@link https://github.com/tinhcs289 | tinhcs289}
 */
export default async function tryDo<R, E = unknown>(
  prom: Promise<R>
): Promise<[error: null, result: R] | [error: E, result: null]> {
  try {
    const result = await prom;
    return [null, result as R];
  } catch (error) {
    const safeError = error instanceof Error ? error : new Error(String(error));
    return [safeError as E, null];
  }
}
