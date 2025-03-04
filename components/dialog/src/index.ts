import Dialog from "./component-root";

export default Dialog;

export {
  useGetStateDialog,
  useInitStateDialog,
  useSetStateDialog
} from "./context";
export { SlideTypeEnum } from "./enums";
export type {
  DialogCloseParams,
  DialogCloseReason,
  DialogOnClose,
  Slot as DialogSlot,
  SlotProps as DialogSlotProps,
  DialogStates,
  SlideType
} from "./types";