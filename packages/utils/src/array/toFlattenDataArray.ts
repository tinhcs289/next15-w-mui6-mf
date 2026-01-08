import cloneDeep from "../common/cloneDeep";
import omit from "lodash/omit";

const ID = "_id";
const PARENT_ID = "_parentId";
const CHILDREN = "_children";

type AnyObject = { [x: string]: any };

export type FlattenOrNestedData<T extends AnyObject = AnyObject> = AnyObject &
  T & {
    [ID]?: string | number;
    [PARENT_ID]?: string | number;
    [CHILDREN]?: FlattenOrNestedData<T>[];
  };
/**
 * Turn nested array into flatten array
 */
export function toFlattenDataArray<T extends AnyObject = AnyObject>(
  /**
   * original array with flat structure
   */
  nestedList: FlattenOrNestedData<T>[],
  options?: {
    /**
     * @default '_id'
     */
    idField?: string;
    /**
     * @default '_parentId'
     */
    parentIdField?: string;
    /**
     * @default '_children'
     */
    childrenField?: string;
    /**
     * keep children property of each item
     * @default false
     */
    keepChildren?: boolean;
  }
): FlattenOrNestedData<T>[] {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idField: _id = ID,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parentIdField: _parentId = PARENT_ID,
    childrenField: _children = CHILDREN,
    keepChildren = false,
  } = options || {};
  const arr = cloneDeep(nestedList);
  const flatten = (list: FlattenOrNestedData<T>[]) => {
    const newList = list.reduce((flattenList, item) => {
      if (item?.[_children] instanceof Array && item[_children].length > 0) {
        const itemChildren = flatten(
          item[_children] as FlattenOrNestedData<T>[]
        );
        if (keepChildren) {
          flattenList.push(item);
        } else {
          const itemWithoutChildren = omit(
            item,
            _children
          ) as FlattenOrNestedData<T>;
          flattenList.push(itemWithoutChildren);
        }
        flattenList = flattenList.concat(itemChildren);
      }
      return flattenList;
    }, [] as FlattenOrNestedData<T>[]);
    return newList;
  };
  const result = flatten(arr);
  return result;
}