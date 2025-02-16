"use client";

import { styled } from "@mui/material";
import type { StackProps } from "@mui/material/Stack";
import Stack from "@mui/material/Stack";

const StackRoot = styled(Stack)<StackProps>(({ theme }) => ({
  justifyContent: "center",
  height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
  marginTop: "max(40px - var(--template-frame-height, 0px), 0px)",
  minHeight: "100%",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));
StackRoot.displayName = "StackRoot";

export default StackRoot;