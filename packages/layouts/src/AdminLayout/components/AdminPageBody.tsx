"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import useWatchElementDimensions from "@shared/utils-react/use-watch-element-dimensions";
import type { ComponentType } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { HeightInitializer, WidthInitializer } from "../context";

const AdminPageBody = styled(forwardRef<HTMLDivElement, BoxProps<"div">>(
  ({ children, className, ...props }, ref) => {
    const [innerRef, w, h] = useWatchElementDimensions<HTMLDivElement>();
    useImperativeHandle(ref, () => innerRef.current!, []);
    return (
      <Box
        {...props}
        component="div"
        className={`page-body ${className || ""}`}
        ref={innerRef}
        data-aos="fade-in"
        data-aos-easing="ease"
        data-aos-delay="300"
        data-aos-duration="500"
      >
        <HeightInitializer state={h} />
        <WidthInitializer state={w} />
        {children}
      </Box>
    );
  }
))<BoxProps<"div">>(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: 0,
  margin: 0,
  overflow: "auto",
  position: "relative",
  marginTop: `${theme.spacing(4)} !important`,
  [theme.breakpoints.down("md")]: {
    marginTop: `${theme.spacing(1)} !important`,
    height: `calc(100svh - 65px - ${theme.spacing(2)})`,
  }
})) as ComponentType<BoxProps>;

export default AdminPageBody;