export type ShopeeCategoryItem = {
  catid?: number;
  parent_catid?: number;
  name?: string;
  display_name?: string;
  image?: string;
  unselected_image?: string;
  selected_image?: string;
  level?: number;
  block_buyer_platform?: any;
  children?: ShopeeCategoryItem[];
  [x: string]: any;
};

export type ShopeeProductItem = {
  itemid?: number;
  key?: `item:${number}`;
  item_status?: string;
  item_type?: number;
  add_on_deal_info?: any;
  adsid?: number;
  autogen_title?: string;
  autogen_title_id?: string;
  badge_icon_type?: number;
  brand?: string;
  bundle_deal_id?: number;
  bundle_deal_info?: any;
  campaignid?: number;
  can_use_bundle_deal?: boolean;
  can_use_cod?: boolean;
  can_use_wholesale?: boolean;
  catid?: number;
  cb_option?: number;
  cmt_count?: number;
  coin_earn_label?: any;
  coin_info?: any;
  count?: number;
  ctime?: number;
  currency?: string;
  data_type?: string;
  deduction_info?: string;
  deep_discount_skin?: null;
  discount?: `${number}%`;
  exclusive_price_info?: null;
  experiment_info?: {
    cod_free_shipping_exp?: {
      group?: string;
      should_display_cod?: boolean;
      should_display_free_shipping?: boolean;
    };
    flash_sale_label_exp?: any;
    highlight_video_exp?: {
      group?: string;
      images?: string[];
    };
    image_overlay_exp?: {
      group?: string;
      images?: string[];
    };
    title_autogen_exp?: {
      group?: string;
      title?: string;
    };
  };
  ext_info?: string;
  fashion_item?: boolean;
  flag?: number;
  flash_sale_design_style?: any;
  flash_sale_label_content?: any;
  flash_sale_sold_percentage?: any;
  flash_sale_stock?: number;
  friend_relationship_label?: string;
  group_buy_info?: any;
  has_group_buy_stock?: any;
  has_lowest_price_guarantee?: boolean;
  has_model_with_available_shopee_stock?: boolean;
  hidden_price_display?: any;
  highlight_video?: any;
  historical_sold?: number;
  image?: string;
  image_search?: any;
  images?: string[];
  info?: string;
  is_adult?: boolean;
  is_category_failed?: boolean;
  is_cc_installment_payment_eligible?: boolean;
  is_group_buy_item?: boolean;
  is_live_streaming_price?: boolean;
  is_mart?: boolean;
  is_non_cc_installment_payment_eligible?: boolean;
  is_official_shop?: boolean;
  is_on_flash_sale?: boolean;
  is_preferred_plus_seller?: boolean;
  is_service_by_shopee?: boolean;
  item_rating?: {
    rating_count?: number[];
    rating_star?: number;
    rcount_with_context?: number;
    rcount_with_image?: number;
  };
  label_ids?: number[];
  liked?: boolean;
  liked_count?: number;
  live_stream_session?: {
    session_id?: string;
    shop_is_live?: boolean;
    view_cnt?: any;
  };
  name?: string;
  new_user_label?: any;
  overlay_id?: number;
  overlay_image?: string;
  pack_size?: any;
  platform_voucher?: any;
  preview_info?: any;
  price?: number;
  price_before_discount?: number;
  price_max?: number;
  price_max_before_discount?: number;
  price_min?: number;
  price_min_before_discount?: number;
  product_banners?: any;
  pub_context_id?: string;
  pub_id?: string;
  raw_discount?: number;
  rcmd_reason?: any;
  reference_item_id?: string;
  relationship_label?: string;
  search_id?: string;
  shop_location?: string;
  shop_name?: string;
  shop_rating?: number;
  shopee_verified?: boolean;
  shopid?: number;
  show_discount?: number;
  show_flash_sale_label?: boolean;
  show_free_shipping?: boolean;
  show_official_shop_label?: boolean;
  show_official_shop_label_in_title?: boolean;
  show_shopee_verified_label?: boolean;
  showing_friend_rs_label?: boolean;
  showing_rs_label?: boolean;
  size_chart?: string;
  sold?: number;
  spl_installment_tenure?: any;
  status?: number;
  stock?: number;
  tier_variations?: {
    images?: string[];
    name?: string;
    type?: number;
    properties?: any[];
    options?: string[];
  }[];
  top_product_label?: any;
  transparent_background_image?: string;
  video_display_control?: number;
  video_info_list?: any[];
  view_count?: number;
  voucher_info?: {
    label?: string;
    promotion_id?: number;
    voucher_code?: string;
  };
  welcome_package_info?: any;
  welcome_package_type?: number;
  wp_eligibility?: any;
  [x: string]: any;
};

export type ShopeePromoBrandItem = {
  shopid?: number;
  image?: string;
  promo_text?: string;
  recommendation_algorithm?: any;
  recommendation_info?: string;
  url?: string;
  [x: string]: any;
};

export type ShopeeProductItemImageFlag = {
  id?: number;
  displayed_image?: string;
  displayed_image_height?: number;
  displayed_image_width?: number;
  is_predefined?: boolean;
  name?: string;
  product_label_ids?: number[];
};

export type ShopeeProductItemImageOverlay = ShopeeProductItemImageFlag & {
  campaign_image?: string;
  campaign_image_height?: number;
  campaign_image_width?: number;
};

export type ShopeeProductItemPromotionLabel = ShopeeProductItemImageFlag & {
  displayed_texts?: {
    lang?: string;
    text?: string;
  }[];
  color?: string;
};

export type ShopeeElementSet = {
  image_flag?: ShopeeProductItemImageFlag[];
  overlay_image?: ShopeeProductItemImageOverlay[];
  promotion_label?: ShopeeProductItemPromotionLabel[];
};
