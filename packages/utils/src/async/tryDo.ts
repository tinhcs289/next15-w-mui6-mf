/**
 * An elegant wait to do async/await
 * @example
   const [error, result] = await tryDo(getUser(id));
   if (error) {
     console.log(error);
   }
   // go ahead with result
 */
   export default async function tryDo<T>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prom: ((...args: any[]) => Promise<T>) | Promise<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ): Promise<[error: null, result: T] | [error: unknown, result: null]> {
    try {
      const result = await (typeof prom === "function" ? prom(...args) : prom);
      return [null, result as T];
    } catch (error) {
      return [error, null];
    }
  }