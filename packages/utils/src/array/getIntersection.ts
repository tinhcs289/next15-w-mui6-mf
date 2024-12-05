/**
 * Get the intersection of 2 arrays
 */
export default function getIntersection<T>(
  array1: T[],
  array2: T[],
  comparer?: (itemOfArr1: T, itemOfArr2: T) => boolean
) {
  if (!(array1 instanceof Array && array1.length > 0)) return [];
  if (!(array2 instanceof Array && array2.length > 0)) return [];
  if (typeof comparer !== "function") {
    return array1.filter((e1) => {
      return array2.some((e2) => e2 === e1);
    });
  } else {
    return array1.filter((e1) => {
      return array2.some((e2) => comparer(e1, e2) === true);
    });
  }
}
