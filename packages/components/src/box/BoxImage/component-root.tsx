import type { ComponentType } from "react";
import { forwardRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BoxImageCover } from "./components-styled";
import type { BoxImageProps } from "./types";

export const BoxImage = forwardRef<HTMLDivElement, BoxImageProps>(
  ({ imageProps, ...props }, ref) => {
    return (
      <BoxImageCover {...props} ref={ref}>
        <LazyLoadImage
          effect="blur"
          // @ts-ignore
          width={props?.width ?? undefined}
          // @ts-ignore
          height={props?.height ?? undefined}
          {...imageProps}
        />
      </BoxImageCover>
    );
  }
) as ComponentType<BoxImageProps>;
BoxImage.displayName = "BoxImage";
