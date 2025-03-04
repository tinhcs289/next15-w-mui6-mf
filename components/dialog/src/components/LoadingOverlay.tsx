"use client";

import { styled } from "@mui/material";
import type { BackdropProps } from "@mui/material/Backdrop";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { memo, useMemo } from "react";
import { useGetStateDialog } from "../context";

const StyledLoadingOverlay = styled(Backdrop)<BackdropProps>(({ theme }) => ({
  zIndex: theme.zIndex.modal + 2,
  position: "absolute",
}));
StyledLoadingOverlay.displayName = "StyledLoadingOverlay";

const LoadingOverlay = memo(() => {
  const loading = useGetStateDialog((s) => !!s?.loading);
  const $Loading = useMemo(
    () =>
      loading ? (
        <StyledLoadingOverlay open>
          <CircularProgress color="inherit" />
        </StyledLoadingOverlay>
      ) : null,
    [loading]
  );
  return $Loading;
});
LoadingOverlay.displayName = "LoadingOverlay";

export default LoadingOverlay;
