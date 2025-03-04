import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import { SlideTypeEnum } from "../enums";

const SlideComponent = Object.keys(SlideTypeEnum).reduce(
  (dict, key) => {
    // @ts-ignore
    dict[key] = forwardRef(function Transition(props, ref) {
      return <Slide direction={key} ref={ref} {...(props as any)} />;
    });
    return dict;
  },
  {} as { [key in SlideTypeEnum]: typeof Slide }
);
export default SlideComponent;
