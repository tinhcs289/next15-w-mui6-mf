"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { LazyLoadImageProps } from "react-lazy-load-image-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BoxCover = styled(Box)<BoxProps>({
  "& span.lazy-load-image-background": {
    height: "100% !important",
    width: "100% !important",
    overflow: "hidden",
    position: "relative",
    "> img": {
      position: "absolute",
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
  },
});

export type BoxImageProps = BoxProps & {
  imageProps?: Partial<LazyLoadImageProps>;
};

export default function BoxImage({ imageProps, ...props }: BoxImageProps) {
  return (
    <BoxCover {...props}>
      <LazyLoadImage
        effect="blur"
        // @ts-ignore
        width={props?.width ?? undefined}
        // @ts-ignore
        height={props?.height ?? undefined}
        {...imageProps}
      />
    </BoxCover>
  );
}
