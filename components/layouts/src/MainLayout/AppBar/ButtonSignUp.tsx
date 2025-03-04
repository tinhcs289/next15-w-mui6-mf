"use client";

import Button from "@mui/material/Button";
import { useMemo } from "react";
import { useGetMainLayoutState } from "../context";

const LINK = "/sign-up";

export default function ButtonSignUp({ mobile = false }: { mobile?: boolean }) {
  const locale = useGetMainLayoutState((s) => s?.locale);
  const href = useMemo(() => !locale ? LINK : `/${locale}${LINK}`, [locale]);

  return (
    <Button
      LinkComponent="a"
      target="_self"
      href={href}
      color="primary"
      variant="contained"
      {...(!mobile
        ? {
            size: "small",
          }
        : {
            fullWidth: true,
          })}
    >
      Sign up
    </Button>
  );
}