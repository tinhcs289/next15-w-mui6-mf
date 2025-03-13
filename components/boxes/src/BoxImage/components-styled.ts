"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { ComponentType } from "react";

export const BoxImageCover = styled(Box)<BoxProps>({
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
}) as ComponentType<BoxProps>;
BoxImageCover.displayName = "BoxImageCover";
