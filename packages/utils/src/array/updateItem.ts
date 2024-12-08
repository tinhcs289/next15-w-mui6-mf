import cloneDeep from "lodash/cloneDeep";

export default function updateItem<T>(
  arr: T[] = [],
  item: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exp: (i: T) => boolean = (_i) => true
) {
  if (
    !(
      arr instanceof Array &&
      arr.length > 0 &&
      !!item &&
      typeof exp === "function"
    )
  )
    return [];

  const newArr = cloneDeep(arr);
  const i = newArr.findIndex(exp);

  if (i === 0) return newArr;

  newArr[i] = item;
  return newArr;
}