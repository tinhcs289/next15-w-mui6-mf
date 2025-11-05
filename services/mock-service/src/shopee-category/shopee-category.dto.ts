export type ShopeeCategoryDto = {
  catid: number;
  parent_catid?: number | null;
  name?: string | null;
  display_name?: string | null;
  image?: string | null;
  unselected_image?: string | null;
  selected_image?: string | null;
  level?: number | null;
  block_buyer_platform?: any;
  children?: ShopeeCategoryDto[] | null;
};
