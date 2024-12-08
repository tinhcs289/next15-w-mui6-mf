import uniqBy from "lodash/uniqBy";

/**
 * merge multiple arrays into one without duplicated elements.
 */
export default function merge<T>(
  arrays: T[][],
  comparer?: (i: T) => any
) {
  if (!arrays || !(arrays instanceof Array && arrays.length > 0)) return [];
  let result = [] as T[];
  arrays.forEach((a) => {
    result = result.concat(a);
  });
  const cmp = comparer || ((i: T) => i);
  result = uniqBy(result, cmp);
  return result;
}