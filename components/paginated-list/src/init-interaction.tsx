"use client";

import { memo, useCallback } from "react";
import { useInitState, useSetState } from "./context";
import type { Interaction } from "./types";


export const InteractionInitializer = memo(() => {
  const setState = useSetState();

  const setInteraction = useCallback(
    (interaction: Interaction) => {
      const { action, item, element, keepAnchor, keepInteract } = interaction;
      if (!action) return;
      setState({ itemInteractAction: action });
      if (!!item) setState({ itemToInteract: item as any });
      else {
        if (!keepInteract) setState({ itemToInteract: null });
      }
      if (!!element) setState({ itemInteractAnchor: element });
      else {
        if (!keepAnchor) setState({ itemInteractAnchor: null });
      }
      return;
    },
    [setState]
  );

  useInitState("setInteraction", setInteraction, {
    when: "whenever-value-changes",
  });

  const clearInteraction = useCallback(() => {
    setState({
      itemToInteract: null,
      itemInteractAction: "",
      itemInteractAnchor: null,
    });
  }, [setState]);

  useInitState("clearInteraction", clearInteraction, {
    when: "whenever-value-changes",
  });

  return null;
});

InteractionInitializer.displayName = "InteractionInitializer";