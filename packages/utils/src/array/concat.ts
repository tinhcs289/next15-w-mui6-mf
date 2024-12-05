/**
 * concat multiple arrays (include duplicated elements)
 */
export default function concat<T>(...arrs: T[][]) {
  let result = [] as T[];
  arrs.forEach((a) => {
    result = result.concat(a);
  });

  return result;
};