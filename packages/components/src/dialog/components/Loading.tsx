"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { memo, useMemo } from "react";
import S from "../components-styled";
import { useGetStateDialog } from "../context";

const Loading = memo(function LoadingMemo() {
  const loading = useGetStateDialog((s) => !!s?.loading);
  const $Loading = useMemo(
    () =>
      loading ? (
        <S.LoadingOverlay open>
          <CircularProgress color="inherit" />
        </S.LoadingOverlay>
      ) : null,
    [loading]
  );
  return $Loading;
});
Loading.displayName = "Loading";
export default Loading;
