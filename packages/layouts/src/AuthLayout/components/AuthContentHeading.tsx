import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { SitemarkIcon } from "./CustomIcons";

export default function AuthContentHeading({ children } : { children?: ReactNode }) {
  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        {children}
      </Typography>
    </>
  );
}