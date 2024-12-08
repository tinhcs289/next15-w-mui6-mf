import cloneDeep from "lodash/cloneDeep";

/**
 * insert an item at a specified index of the array
 */
export default function insertAt<T>(arr: T[] = [], item: T, index: number = 0) {
  // eslint-disable-next-line prefer-const
  let cloneArray = cloneDeep(arr);
  let updateArray = cloneArray.slice(0, index + 1);
  updateArray.push(item);
  updateArray = updateArray.concat(
    cloneArray.slice(index + 1, cloneArray.length)
  );
  return updateArray;
}