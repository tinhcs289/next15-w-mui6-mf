import cloneDeep from "../common/cloneDeep";

const ID = "_id";
const PARENT_ID = "_parentId";
const CHILDREN = "_children";

export default function toNestedDataArray<T>(
  flatArray: T[],
  options: {
    hasParentWhen: (item: T) => boolean;
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
     * compare function for sorting children
     * @default undefined
     */
    sortFn?: (left: T, right: T) => number;
  }
) {
  const {
    idField: _id = ID,
    parentIdField: _parentId = PARENT_ID,
    childrenField: _children = CHILDREN,
    sortFn,
    hasParentWhen,
  } = options || {};
  const list = cloneDeep(flatArray);

  list.forEach((item, _, rest) => {
    const child = rest.filter(
      (other) => (other as any)[_parentId] === (item as any)[_id]
    );
    if (typeof sortFn === "function") child.sort(sortFn);
    (item as any)[_children] = child;
  });
  const tree = list.filter((item) => !hasParentWhen(item));
  if (typeof sortFn === "function") tree.sort(sortFn);
  return tree;
}