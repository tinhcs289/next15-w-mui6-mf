"use client";

import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { styled } from "@mui/material";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";
import { cloneDeep } from "lodash";
import type { MouseEventHandler } from "react";
import { useCallback, useMemo } from "react";
import { useGetColumnVisibility, useGetState, useSetState } from "../context";

const ICON = {
  ASC: NorthIcon,
  DESC: SouthIcon,
}

const IconButtonStyled = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  width: theme.spacing(1.5),
  height: theme.spacing(1.5),
  border: "none",
  "& > svg": {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
  },
  ...theme.applyStyles("dark", {
    background: "hsl(217.89deg 24.68% 15.1%) !important",
  })
}));
IconButtonStyled.displayName = "IconButtonStyled";

function useSort(fieldOrId?: string) {
  const { defaultSortDirection: defaultDir = "asc", field } =
    useGetColumnVisibility(fieldOrId);

  const setState = useSetState();
  const sortOptions = useGetState((s) => s?.sortOptions);

  const currentDirection = useMemo(
    () =>
      !field
        ? undefined
        : sortOptions?.find?.((o) => o.by === field)?.direction,
    [sortOptions, field]
  );

  const updateSort = useCallback(
    (d?: "asc" | "desc") => {
      if (!field) return;
      if (!d) {
        if (!sortOptions?.length) return;
        setState({ sortOptions: sortOptions.filter((o) => o.by !== field) }); 
        return;
      }

      if (!sortOptions?.length) {
        setState({ sortOptions: [{ by: field, direction: d }] });
        return;
      }

      const newOptions = cloneDeep(sortOptions);
      const optionIndex= newOptions.findIndex(o => o.by === field);

      if (optionIndex === -1) {
        newOptions.push({ by: field, direction: d });
        setState({ sortOptions: newOptions });
        return;
      }

      if (!newOptions?.[optionIndex]) return;

      newOptions[optionIndex].direction = d;
      setState({ sortOptions: newOptions });
      return;
    },
    [sortOptions, field]
  );

  return { currentDirection, updateSort };
}

export default function SortButton({ columnId }: { columnId?: string; }) {
  const { currentDirection, updateSort } = useSort(columnId);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (!currentDirection) {
      updateSort("asc");
      return;
    }
    if (currentDirection === "asc") {
      updateSort("desc");
      return;
    }
    updateSort(undefined);
  }, [currentDirection, updateSort]);


  const $Icon = useMemo(() => {
    if (currentDirection === "asc") return <ICON.ASC color="primary" sx={{ fontWeight: 600 }} />;
    if (currentDirection === "desc")
      return <ICON.DESC color="primary" sx={{ fontWeight: 600 }} />;
    return <ICON.ASC color="disabled" />
  }, [currentDirection]);

  return (
    <IconButtonStyled onClick={handleClick}>
      {$Icon}
    </IconButtonStyled>
  );
}