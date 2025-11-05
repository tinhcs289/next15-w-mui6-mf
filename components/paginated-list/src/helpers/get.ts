export default function get<T, R = undefined>(
  obj: T,
  path: string | Array<string | number>,
  defaultValue?: R
): any {
  if (obj == null) return defaultValue;

  const pathArray = Array.isArray(path)
    ? path
    : path
        .replace(/\[(\w+)\]/g, ".$1") // biến [0] → .0
        .replace(/^\./, "") // bỏ dấu . ở đầu
        .split(".");

  let result: any = obj;

  for (const key of pathArray) {
    if (result == null) return defaultValue;
    result = result[key as keyof typeof result];
  }

  return result === undefined ? defaultValue : result;
}