import cloneDeep from "lodash/cloneDeep";

/**
 * remove first item in the array which meet some conditions
 */
export default function removeBy<T>(
  arr: T[] = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exp: (i: T) => boolean = (_i) => true
) {
  const newArr = cloneDeep(arr);
  const index = newArr.findIndex(exp);
  if (index === -1) return newArr;
  let result = newArr.slice(0, index);
  result = result.concat(arr.slice(index + 1, newArr.length));
  return result;
}