import type { BoxProps } from "@mui/material/Box";
import type { LazyLoadImageProps } from "react-lazy-load-image-component";

export type BoxImageProps = BoxProps & {
  imageProps?: Partial<LazyLoadImageProps>;
};
