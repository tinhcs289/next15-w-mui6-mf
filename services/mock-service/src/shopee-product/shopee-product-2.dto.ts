import { ApiProperty } from "@nestjs/swagger";

export class RecordWithIDDto {
  constructor(partial: Partial<RecordWithIDDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ description: "ID của sản phẩm", required: false })
  public itemid?: number;
} 

export class ShopeeProductDto {
  constructor(partial: Partial<ShopeeProductDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ description: "ID của sản phẩm", required: false })
  public itemid?: number;

  @ApiProperty({ description: "Khóa item (nếu có)", required: false })
  public key?: `item:${number}`;

  @ApiProperty({ description: "Trạng thái sản phẩm", required: false })
  public item_status?: string;

  @ApiProperty({ description: "Loại sản phẩm", required: false })
  public item_type?: number;

  @ApiProperty({ description: "Thông tin deal (nếu có)", required: false })
  public add_on_deal_info?: any;

  @ApiProperty({ description: "ID quảng cáo (nếu có)", required: false })
  public adsid?: number;

  @ApiProperty({ description: "Tiêu đề tự động (nếu có)", required: false })
  public autogen_title?: string;

  @ApiProperty({ description: "ID tiêu đề tự động (nếu có)", required: false })
  public autogen_title_id?: string;

  @ApiProperty({ description: "Loại biểu tượng huy hiệu (nếu có)", required: false })
  public badge_icon_type?: number;

  @ApiProperty({ description: "Thương hiệu (nếu có)", required: false })
  public brand?: string;

  @ApiProperty({ description: "ID deal bundle (nếu có)", required: false })
  public bundle_deal_id?: number;

  @ApiProperty({ description: "Thông tin deal bundle (nếu có)", required: false })
  public bundle_deal_info?: any;

  @ApiProperty({ description: "ID chiến dịch (nếu có)", required: false })
  public campaignid?: number;

  @ApiProperty({ description: "Có thể dùng deal bundle (nếu có)", required: false })
  public can_use_bundle_deal?: boolean;

  @ApiProperty({ description: "Có thể sử dụng COD (nếu có)", required: false })
  public can_use_cod?: boolean;

  @ApiProperty({ description: "Có thể bán buôn (nếu có)", required: false })
  public can_use_wholesale?: boolean;

  @ApiProperty({ description: "Danh mục sản phẩm (nếu có)", required: false })
  public catid?: number;

  @ApiProperty({ description: "Thông tin giảm giá (nếu có)", required: false })
  public deduction_info?: string;

  @ApiProperty({ description: "Giảm giá sản phẩm (nếu có)", required: false })
  public discount?: `${number}%`;

  @ApiProperty({ description: "Thông tin sản phẩm cho người dùng mới (nếu có)", required: false })
  public new_user_label?: any;

  @ApiProperty({ description: "Giảm giá (nếu có)", required: false })
  public raw_discount?: number;

  @ApiProperty({ description: "Tên sản phẩm (nếu có)", required: false })
  public name?: string;

  @ApiProperty({ description: "URL ảnh sản phẩm (nếu có)", required: false })
  public image?: string;

  @ApiProperty({ description: "Danh sách ảnh sản phẩm", required: false, type: [String] })
  public images?: string[];

  @ApiProperty({ description: "Giá sản phẩm (nếu có)", required: false })
  public price?: number;

  @ApiProperty({ description: "Thông tin voucher nếu có", required: false, type: () => VoucherInfo })
  public voucher_info?: VoucherInfo;

  @ApiProperty({ description: "Thông tin live stream của sản phẩm", required: false, type: () => LiveStreamSession })
  public live_stream_session?: LiveStreamSession;

  @ApiProperty({ description: "Thông tin về đánh giá sản phẩm", required: false, type: () => ItemRating })
  public item_rating?: ItemRating;

  @ApiProperty({ description: "Thông tin về các sản phẩm thuộc các loại biến thể", required: false, type: () => [TierVariation] })
  public tier_variations?: TierVariation[];

  @ApiProperty({ description: "Thông tin về sản phẩm có flash sale", required: false, type: Object })
  public flash_sale_label_content?: any;

  @ApiProperty({ description: "Thông tin về sản phẩm có giá trị cam kết thấp nhất", required: false, type: Boolean })
  public has_lowest_price_guarantee?: boolean;

  @ApiProperty({ description: "Thông tin về sản phẩm có thể được bán trả góp", required: false, type: Boolean })
  public has_model_with_available_shopee_stock?: boolean;

  @ApiProperty({ description: "Thông tin về sản phẩm có khuyến mãi (voucher)", required: false, type: Object })
  public platform_voucher?: any;

  @ApiProperty({ description: "Thông tin về sản phẩm thuộc gói chào mừng", required: false, type: Object })
  public welcome_package_info?: any;

  @ApiProperty({ description: "Thông tin về sản phẩm thuộc nhóm ưu đãi chào mừng", required: false, type: Number })
  public welcome_package_type?: number;

  @ApiProperty({ description: "Thông tin về trạng thái sản phẩm trong chương trình ưu đãi", required: false, type: () => ExperimentInfo })
  public experiment_info?: ExperimentInfo;
}

export class VoucherInfo {
  @ApiProperty({ description: "Mã giảm giá" })
  public voucher_code?: string;

  @ApiProperty({ description: "ID của chương trình khuyến mãi" })
  public promotion_id?: number;

  @ApiProperty({ description: "Nhãn của voucher" })
  public label?: string;
}

export class LiveStreamSession {
  @ApiProperty({ description: "ID phiên live stream" })
  public session_id?: string;

  @ApiProperty({ description: "Trạng thái của cửa hàng khi đang live stream" })
  public shop_is_live?: boolean;

  @ApiProperty({ description: "Số lượng người xem" })
  public view_cnt?: any;
}

export class ItemRating {
  @ApiProperty({ description: "Số lượng đánh giá của sản phẩm" })
  public rating_count?: number[];

  @ApiProperty({ description: "Số sao trung bình của sản phẩm" })
  public rating_star?: number;

  @ApiProperty({ description: "Số lượng đánh giá có bối cảnh" })
  public rcount_with_context?: number;

  @ApiProperty({ description: "Số lượng đánh giá có ảnh" })
  public rcount_with_image?: number;
}

export class TierVariation {
  @ApiProperty({ description: "Danh sách hình ảnh" })
  public images?: string[];

  @ApiProperty({ description: "Tên của biến thể" })
  public name?: string;

  @ApiProperty({ description: "Loại biến thể" })
  public type?: number;

  @ApiProperty({ description: "Danh sách thuộc tính" })
  public properties?: any[];

  @ApiProperty({ description: "Danh sách các tùy chọn" })
  options?: string[];
}

export class CodFreeShippingExp {
  @ApiProperty({ description: "Nhóm của chương trình COD Free Shipping" })
  group?: string;

  @ApiProperty({ description: "Hiển thị COD" })
  should_display_cod?: boolean;

  @ApiProperty({ description: "Hiển thị miễn phí vận chuyển" })
  should_display_free_shipping?: boolean;
}

export class HighlightVideoExp {
  @ApiProperty({ description: "Nhóm của video nổi bật" })
  group?: string;

  @ApiProperty({ description: "Danh sách các video hình ảnh" })
  images?: string[];
}

export class ImageOverlayExp {
  @ApiProperty({ description: "Nhóm của overlay hình ảnh" })
  group?: string;

  @ApiProperty({ description: "Danh sách hình ảnh overlay" })
  images?: string[];
}

export class TitleAutogenExp {
  @ApiProperty({ description: "Nhóm của tiêu đề tự động" })
  group?: string;

  @ApiProperty({ description: "Tiêu đề tự động" })
  title?: string;
}

export class ExperimentInfo {
  @ApiProperty({ type: CodFreeShippingExp, description: "Thông tin về COD Free Shipping" })
  cod_free_shipping_exp?: CodFreeShippingExp;

  @ApiProperty({ type: HighlightVideoExp, description: "Thông tin về video nổi bật" })
  highlight_video_exp?: HighlightVideoExp;

  @ApiProperty({ type: ImageOverlayExp, description: "Thông tin về overlay hình ảnh" })
  image_overlay_exp?: ImageOverlayExp;

  @ApiProperty({ type: TitleAutogenExp, description: "Thông tin về tiêu đề tự động" })
  title_autogen_exp?: TitleAutogenExp;
}

export class CreateShopeeProductDto extends Omit<ShopeeProductDto, "itemid"> {
  
}