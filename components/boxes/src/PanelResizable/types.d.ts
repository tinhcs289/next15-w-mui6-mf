import type { BoxProps } from "@mui/material/Box";
import type {
  ComponentPropsWithoutRef,
  Dispatch,
  JSX,
  RefObject,
  SetStateAction,
} from "react";

export type SeparatorProps = ComponentPropsWithoutRef;

export type SplitterProps = SeparatorProps;

export type UseResizableLayoutReturns = {
  /**
   * border position
   */
  position: number;
  /**
   * position at end of drag
   */
  endPosition: number;
  /**
   * whether the border is dragging
   */
  isDragging: boolean;
  /**
   * props for drag bar
   */
  separatorProps: SeparatorProps;
  /**
   * set border position
   */
  setPosition: Dispatch<SetStateAction<number>>;
  /**
   * props for drag bar
   */
  splitterProps: SplitterProps;
};

export type ResizeCallbackArgs = {
  /**
   * position at the time of callback
   */
  position: number;
};

export type UseResizableLayoutParams = {
  /**
   * direction of resizing
   */
  axis: "x" | "y";
  /**
   * ref of the container element
   */
  containerRef?: RefObject<HTMLElement>;
  /**
   * if true, cannot resize
   */
  disabled?: boolean;
  /**
   * initial border position
   */
  initial?: number;
  /**
   * minimum border position
   */
  min?: number;
  /**
   * maximum border position
   */
  max?: number;
  /**
   * calculate border position from other side
   */
  reverse?: boolean;
  /**
   * resizing step with keyboard
   */
  step?: number;
  shiftStep?: number;
  /**
   * callback when border position changes start
   */
  onResizeStart?: (args: ResizeCallbackArgs) => void;
  /**
   * callback when border position changes end
   */
  onResizeEnd?: (args: ResizeCallbackArgs) => void;
};

export type ResizableProps = UseResizableLayoutParams & {
  /**
   * callback children
   */
  children: (props: UseResizableLayoutReturns) => JSX.Element;
};

export type ResizeSplitterProps = BoxProps<"div"> & {
  axis?: "x" | "y";
  isDragging?: boolean;
};

export type PanelResizableGroupProps = BoxProps<"div"> & {
  axis?: "x" | "y";
  item?: boolean;
};

export type PanelResizableProps = BoxProps<"div"> & {
  resizeOptions: UseResizableLayoutParams;
  splitterPosition?: "start" | "end";
};

export type PanelProps = BoxProps<"div">;


export type PanelResizableContextValues = {
  axis?: "x" | "y";
  width?: number;
  height?: number;
}