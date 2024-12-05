/**
 * get last item of array
 * @example const lastUser = lastOfArray(users)
 * @example const lastUserWhoIsMale = lastOfArray(users, u => u.gender === male)
 */
export default function getLast<T>(
  _array: T[],
  _predicate?: (t: T) => boolean
) {
  if (typeof _predicate === "function") {
    const _filterArray = _array.filter((o) => _predicate(o) === true);
    return _filterArray.length > 0
      ? _filterArray[_filterArray.length - 1]
      : null;
  } else {
    return _array.length > 0 ? _array[_array.length - 1] : null;
  }
}