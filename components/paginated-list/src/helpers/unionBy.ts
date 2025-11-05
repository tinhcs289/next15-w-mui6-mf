type Iteratee<T> = keyof T | ((item: T) => any);

export default function unionBy<T>(
  ...args: [...arrays: T[][], iteratee: Iteratee<T>]
): T[] {
  const iteratee = args.pop() as Iteratee<T>;
  const arrays = args as T[][];
  const flattened = arrays.flat();
  const seen = new Set<any>();
  const result: T[] = [];

  for (const item of flattened) {
    const key =
      typeof iteratee === "function"
        ? iteratee(item)
        : item[iteratee];

    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}