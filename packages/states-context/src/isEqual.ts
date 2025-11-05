const isIterable = (obj: object): obj is Iterable<unknown> =>
  Symbol.iterator in obj;

const hasIterableEntries = (
  value: Iterable<unknown>
): value is Iterable<unknown> & {
  entries(): Iterable<[unknown, unknown]>;
} =>
  // HACK: avoid checking entries type
  "entries" in value;

const compareEntries = (
  valueA: { entries(): Iterable<[unknown, unknown]> },
  valueB: { entries(): Iterable<[unknown, unknown]> }
): boolean => {
  const entriesA = Array.from(valueA.entries());
  const entriesB = Array.from(valueB.entries());

  if (entriesA.length !== entriesB.length) {
    return false;
  }

  for (let i = 0; i < entriesA.length; i++) {
    // @ts-ignore
    const [keyA, valA] = entriesA[i];
    const [keyB, valB] = entriesB[i];

    if (!Object.is(keyA, keyB)) {
      return false;
    }

    if (!isEqual(valA, valB)) {
      return false;
    }
  }

  return true;
};

const compareIterables = (
  valueA: Iterable<unknown>,
  valueB: Iterable<unknown>
) => {
  const iteratorA = valueA[Symbol.iterator]();
  const iteratorB = valueB[Symbol.iterator]();
  let nextA = iteratorA.next();
  let nextB = iteratorB.next();
  while (!nextA.done && !nextB.done) {
    if (!Object.is(nextA.value, nextB.value)) {
      return false;
    }
    nextA = iteratorA.next();
    nextB = iteratorB.next();
  }
  return !!nextA.done && !!nextB.done;
};

export default function isEqual<T>(valueA: T, valueB: T): boolean {
  if (Object.is(valueA, valueB)) {
    return true;
  }

  if (valueA instanceof Date && valueB instanceof Date) {
    return valueA.getTime() === valueB.getTime();
  }

  if (
    typeof valueA !== "object" ||
    valueA === null ||
    typeof valueB !== "object" ||
    valueB === null
  ) {
    return false;
  }

  if (valueA.constructor !== valueB.constructor) {
    return false;
  }

  if (!isIterable(valueA) || !isIterable(valueB)) {
    return compareEntries(
      { entries: () => Object.entries(valueA) },
      { entries: () => Object.entries(valueB) }
    );
  }

  if (hasIterableEntries(valueA) && hasIterableEntries(valueB)) {
    return compareEntries(valueA, valueB);
  }

  return compareIterables(valueA, valueB);
}
