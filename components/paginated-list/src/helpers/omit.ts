export default function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[] | K
): Omit<T, K> {
  const keyList = Array.isArray(keys) ? keys : [keys];
  const result = {} as Omit<T, K>;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keyList.includes(key as K)) {
      (result as any)[key] = obj[key];
    }
  }

  return result;
}