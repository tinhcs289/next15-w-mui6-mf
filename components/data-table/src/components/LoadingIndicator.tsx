"use client";

import { alpha, styled } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import { useMemo } from "react";
import { useGetState } from "../context";

const BoxLoading = styled(Box)<BoxProps<"div">>(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[400], 0.5)
      : alpha(theme.palette.grey[900], 0.85),
  margin: "0 auto",
  padding: theme.spacing(8),
  zIndex: 4,
  cursor: "not-allowed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));
BoxLoading.displayName = "BoxLoading";

export default function LoadingIndicator() {
  const loading = useGetState((s) => !!s?.loading);
  const loadingDisplay = useGetState((s) => s?.loadingDisplay);
  const $Loading = useMemo(() => {
    return !loading ? null : (
      <BoxLoading>
        {loadingDisplay}
      </BoxLoading>
    );
  }, [loading, loadingDisplay]);
  return $Loading;
}