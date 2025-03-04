"use client";

import type { CardProps } from "@mui/material/Card";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import type { ComponentType } from "react";
import { forwardRef } from "react";

const AuthContentCard = styled(
  forwardRef<HTMLDivElement, CardProps>(({ children, ...otherProps }, ref) => {
    return (
      <Card
        data-aos="fade-left"
        data-aos-easing="ease"
        data-aos-delay="500"
        {...otherProps}
        ref={ref}
      >
        {children}
      </Card>
    );
  })
)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
})) as ComponentType<CardProps>;
AuthContentCard.displayName = "AuthContentCard";

export default AuthContentCard;