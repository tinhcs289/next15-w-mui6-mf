"use client";

import { styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import useWatchElementDimensions from "@shared/use-watch-element-dimensions";
import type { ComponentType } from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { HeightInitializer, WidthInitializer } from "../context";

const AdminPageBody = styled(
  forwardRef<HTMLDivElement, BoxProps<"div">>(
    ({ children, className, ...props }, ref) => {
      const [rootRef, w, h] = useWatchElementDimensions<HTMLDivElement>();
      useImperativeHandle(ref, () => rootRef.current!, []);

      const innerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (!innerRef?.current) return;
        innerRef.current.style.width = `${w.visible}px`;
        innerRef.current.style.height = `${h.visible}px`;
      }, [w, h]);

      return (
        <Box
          {...props}
          component="div"
          className={`page-body ${className || ""}`}
          ref={rootRef}
          data-aos="fade-in"
          data-aos-easing="ease"
          data-aos-delay="300"
          data-aos-duration="500"
        >
          <Box
            sx={{
              m: 0,
              p: 0,
              width: "auto",
              height: "auto",
              position: "relative",
              overflow: "auto",
              transition: "all ease 0.3s"
            }}
            
            ref={innerRef}
          >
            <HeightInitializer state={h} />
            <WidthInitializer state={w} />
            {children}
          </Box>
        </Box>
      );
    }
  )
)<BoxProps<"div">>(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: 0,
  margin: 0,
  marginTop: `${theme.spacing(4)} !important`,
  [theme.breakpoints.down("md")]: {
    marginTop: `${theme.spacing(1)} !important`,
    height: `calc(100svh - 65px - ${theme.spacing(2)})`,
  },
})) as ComponentType<BoxProps>;

export default AdminPageBody;