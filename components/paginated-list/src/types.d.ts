export type Any = { [x: string]: any };

export type SortDirection = "asc" | "desc";

export type SortOperator = {
  by: string;
  direction: SortDirection;
};

export type ListFilter<Filter extends Any = Any> = {
  searchText?: string;
} & Filter;

export type GetPaginatedListPayload<Filter extends Any = Any> = {
  pageIndex?: number;
  pageSize?: number;
  advanceFilter?: ListFilter<Filter>;
  sortBy?: SortOperator[];
};

export type GetPaginatedListReturns<Item extends Any = Any> = {
  result: Item[];
  totalCount: number;
};

export type GetPaginatedList<
  Item extends Any = Any,
  Filter extends Any = Any,
> = (
  payload: GetPaginatedListPayload<Filter>
) => Promise<GetPaginatedListReturns<Item>>;

export type FetchDataPayload<Filter extends Any = Any> = {
  pageIndex?: number;
  pageSize?: number;
  advanceFilter?: ListFilter<Filter>;
  sortBy?: SortOperator[];
};

export type FetchDataOptions = {
  by?: "payload-only" | "payload-and-current-states";
};

export type FetchData<Filter extends Any = Any> = (
  payload?: FetchDataPayload<Filter>,
  options?: FetchDataOptions
) => void;

export type Interaction<Item extends Any = Any> = {
  action: string;
  item?: Item | null;
  element?: Element | HTMLElement | null;
  keepAnchor?: boolean;
  keepInteract?: boolean;
};

export type PaginatedListStates<
  Item extends Any = Any,
  Filter extends Any = Any,
  ExtendedStates extends Any = Any,
> = {
  initialized?: {
    request?: boolean;
    states?: boolean;
  };
  /**
   * @default 'id'
   */
  idField?: string;
  items?: Item[];
  itemsInPage?: Item[];
  totalCount?: number;
  pageIndex?: number;
  pageSize?: number;
  defaultFilter?: ListFilter<Filter>;
  fixedFilter?: ListFilter<Filter>;
  advanceFilter?: ListFilter<Filter>;
  sortBy?: SortOperator[];
  selectable?: boolean;
  requestState?: "none" | "fetching" | "success" | "fail";
  /**
   * @default 'over-all-pages'
   */
  typeOfSelection?: "only-on-page" | "over-all-pages";
  selectedItems?: Item[];
  isSelectedAll?: boolean;
  itemToInteract?: Item | null;
  itemInteractAction?: string;
  itemInteractAnchor?: Element | HTMLElement | null;
  //
  isSelected?: (item: Item) => boolean;
  checkAllItems?: (checked: boolean) => void;
  checkOrUnCheckItem?: (item: Item) => void;
  setInteraction?: (interaction: Interaction<Item>) => void;
  clearInteraction?: () => void;
  refresh?: () => void;
  fetchData?: FetchData<Filter>;
  updatePaging?: (page: number, size?: number) => void;
  updateSort?: (by: SortOperator[], keepCurrentSorting?: boolean) => void;
  updateFilter?: (
    filter: ListFilter<Filter>,
    keepCurrentFilter?: boolean
  ) => void;
} & ExtendedStates;