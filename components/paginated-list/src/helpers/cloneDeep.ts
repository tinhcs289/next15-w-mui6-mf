export default function cloneDeep<T>(value: T, weakMap = new WeakMap()): T {
  // primitive or function
  if (value === null || typeof value !== "object") return value;

  // avoid circular reference
  if (weakMap.has(value as object)) {
    return weakMap.get(value as object);
  }

  // Date
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  // RegExp
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  // Map
  if (value instanceof Map) {
    const cloned = new Map();
    weakMap.set(value, cloned);
    value.forEach((v, k) =>
      cloned.set(cloneDeep(k, weakMap), cloneDeep(v, weakMap))
    );
    return cloned as T;
  }

  // Set
  if (value instanceof Set) {
    const cloned = new Set();
    weakMap.set(value, cloned);
    value.forEach((v) => cloned.add(cloneDeep(v, weakMap)));
    return cloned as T;
  }

  // Array
  if (Array.isArray(value)) {
    const clonedArr: any[] = [];
    weakMap.set(value, clonedArr);
    value.forEach((item, i) => {
      clonedArr[i] = cloneDeep(item, weakMap);
    });
    return clonedArr as T;
  }

  // ArrrayBuffer
  if (ArrayBuffer.isView(value)) {
    return new (value.constructor as any)(value) as T;
  }

  if (value instanceof ArrayBuffer) {
    return value.slice(0) as T;
  }

  // Error
  if (value instanceof Error) {
    const cloned = new (value.constructor as any)(value.message);
    Object.assign(cloned, value);
    return cloned as T;
  }

  // --- Class instance / object ---
  const proto = Object.getPrototypeOf(value);
  const clonedObj = Object.create(proto);
  weakMap.set(value, clonedObj);

  Reflect.ownKeys(value).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor) {
      if ("value" in descriptor) {
        descriptor.value = cloneDeep((value as any)[key], weakMap);
      }
      Object.defineProperty(clonedObj, key, descriptor);
    }
  });

  return clonedObj as T;
}
