"use client";

import { styled } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import { ComponentType, forwardRef } from "react";

const HeaderStack = styled(
  forwardRef<HTMLDivElement, StackProps>(({ children, ...props }, ref) => {
    return (
      <Stack direction="row" spacing={2} {...props} ref={ref}>
        {children}
      </Stack>
    );
  })
)<StackProps>(({ theme }) => ({
  width: "100%",
  display: "none",
  alignItems: "flex-start",
  justifyContent: "space-between",
  paddingTop: theme.spacing(1.5),
  position: "relative",
  ["&:before"]: {
    content: "''",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: `calc(100% + ${theme.spacing(5)})`,
    height: `calc(100% + ${theme.spacing(3)})`,
    background:
      theme.palette.mode === "light"
        ? theme.palette.background.paper
        : theme.palette.background.default,
    boxShadow: "var(--template-palette-baseShadow)",
    zIndex: 1,
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: "100%",
  },
  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "center",
    maxWidth: "1700px",
  },
})) as ComponentType<StackProps>;
HeaderStack.displayName = "HeaderStack";

export default HeaderStack;