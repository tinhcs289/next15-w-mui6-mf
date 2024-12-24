"use client";

import CloseIcon from "@mui/icons-material/Close";
import type { Theme } from "@mui/material";
import { styled, useMediaQuery } from "@mui/material";
import Backdrop, { BackdropProps } from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  dialogClasses as classes,
  default as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material/Dialog";
import DialogActions, {
  DialogActionsProps as MuiDialogActionsProps,
} from "@mui/material/DialogActions";
import DialogContent, {
  DialogContentProps as MuiDialogContentProps,
} from "@mui/material/DialogContent";
import DialogTitle, {
  DialogTitleProps as MuiDialogTitleProps,
} from "@mui/material/DialogTitle";
import type { Grid2Props as GridProps } from "@mui/material/Grid2";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Typography, { TypographyProps } from "@mui/material/Typography";
import type { AnyObject } from "@repo/types/common";
import type {
  ComponentType,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
  Ref,
} from "react";
import { forwardRef, memo, useCallback, useMemo } from "react";
import { createStatesContext } from "@repo/utils-react/states-context";

export type DialogCloseReason =
  | "after_submit_successful"
  | "click_outside"
  | "force_close";

export type DialogCloseParams<CallbackData extends AnyObject = AnyObject> = {
  reason: DialogCloseReason;
  data?: CallbackData;
};

export type DialogOnClose<CallbackData extends AnyObject = AnyObject> = (
  params: DialogCloseParams<CallbackData>
) => void;

enum SlideTypeEnum {
  down = "down",
  up = "up",
  left = "left",
  right = "right",
}

export type SlideType = `${SlideTypeEnum}`;

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

const DialogStyled = {
  Root: styled(MuiDialog)<MuiDialogProps>({
    [`&.${classes.root}`]: {
      [`& > .${classes.container}`]: {
        [`& > .${classes.paper}`]: {
          [`&:not(.${classes.paperFullScreen})`]: {
            borderRadius: 12,
          },
          minWidth: "680px",
          position: "relative",
          // backgroundImage: `url(${IMAGES.background.dialog})`,
          backgroundRepeat: "none",
          backgroundPosition: "center",
        },
      },
    },
  }),
  Title: styled(DialogTitle)<MuiDialogTitleProps>({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px",
    paddingBottom: "16px",
  }),
  Content: styled(DialogContent)<MuiDialogContentProps>({
    padding: "40px",
  }),
  Actions: styled(DialogActions)<MuiDialogActionsProps>({
    padding: "40px",
    paddingTop: "16px",
  }),
  Loading: styled(Backdrop)<BackdropProps>(({ theme }) => ({
    zIndex: theme.zIndex.modal + 2,
    position: "absolute",
  })),
};

type DialogStates = {
  loading?: boolean;
  onClose?: DialogOnClose;
};

const { StatesProvider, useGetState, useInitState, useSetState } =
  createStatesContext<DialogStates>();

export const useSetStateDialog = useSetState;
export const useInitStateDialog = useInitState;
export const useGetStateDialog = useGetState;

const LoadingInitializer = memo(function Initializer({
  loading,
}: {
  loading?: boolean;
}) {
  useInitState("loading", loading, {
    when: "whenever-value-changes",
  });
  return null;
});

const OnCloseInitializer = memo(function Initializer({
  onClose,
}: {
  onClose?: DialogStates["onClose"];
}) {
  const handleOnClose: Required<DialogStates>["onClose"] = useCallback(
    ({ reason, data }) => {
      onClose?.({ reason, data });
    },
    [onClose]
  );
  useInitState("onClose", handleOnClose, {
    when: "whenever-value-changes",
  });
  return null;
});

function ButtonClose() {
  const onClose = useGetState((s) => s?.onClose);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      onClose?.({ reason: "force_close" });
    },
    [onClose]
  );
  return (
    <IconButton onClick={handleClick}>
      <CloseIcon color="primary" />
    </IconButton>
  );
}

const Loading = memo(function LoadingMemo() {
  const loading = useGetState((s) => !!s?.loading);
  const $Loading = useMemo(
    () =>
      loading ? (
        <DialogStyled.Loading open>
          <CircularProgress color="inherit" />
        </DialogStyled.Loading>
      ) : null,
    [loading]
  );
  return $Loading;
});

/**
 * @example
 * ``` tsx
    import Dialog, { useGetStateDialog } from "@repo/components/dialog/DiaLog";

    function YourView() {
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      return (
        <Dialog.Provider
          loading={loading}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Dialog.Paper open={open}>
            <Dialog.Title closeButton>
              <Dialog.TitleText>...</Dialog.TitleText>
            </Dialog.Title>
            <Dialog.Content>....</Dialog.Content>
            <Dialog.Actions>
              <ButtonCancel />
              <ButtonSubmit />
              ...
            </Dialog.Actions>
          </Dialog.Paper>
        </Dialog.Provider>
      );
    }

    function ButtonSubmit() {
      const setDialogState = useSetStateDialog(s => s?.loading);

      return(
        <Button onClick={() => { setDialogState?.({ loading: true }) }}>Submit</Button>
      );
    }

    function ButtonCancel() {
      const onClose = useGetStateDialog(s => s?.onClose);

      return(
        <Button onClick={() => { onClose?.({ reason: "force_close" }) }}>Cancel</Button>
      );
    }
   ```
 */
const Dialog = {
  Provider: function DialogStatesProvider({
    loading,
    onClose,
    children,
  }: Pick<DialogStates, "loading" | "onClose"> & {
    children?: ReactNode;
  }) {
    return (
      <StatesProvider>
        <LoadingInitializer loading={loading} />
        <OnCloseInitializer onClose={onClose as any} />
        {children}
      </StatesProvider>
    );
  },
  Paper: function DialogCommonPaper({
    children,
    component,
    onSubmit,
    formRef,
    Component = DialogStyled.Root,
    slide = "down",
    ...props
  }: Omit<MuiDialogProps, "onSubmit" | "onClose"> & {
    formRef?: Ref<unknown>;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    Component?: typeof DialogStyled.Root | ComponentType<any>;
    slide?: SlideType;
  }) {
    const formProps = useMemo(() => {
      if (component !== "form") return { component };
      return {
        component,
        ref: formRef,
        noValidate: true,
        autoComplete: "off",
        onSubmit,
      } as unknown as Partial<MuiDialogProps>;
    }, [component, formRef, onSubmit]);

    const isSmallScreenOrSmaller = useMediaQuery((theme: Theme) =>
      theme?.breakpoints?.down?.("sm")
    );
    const fullScreen = useMemo(() => {
      if (!!props?.fullScreen) return true;
      if (isSmallScreenOrSmaller) return true;
      return false;
    }, [props?.fullScreen, isSmallScreenOrSmaller]);

    return (
      <Component
        keepMounted={false}
        scroll="paper"
        TransitionComponent={SlideComponent[slide]}
        {...props}
        {...formProps}
        fullScreen={fullScreen}
      >
        <Loading />
        {children}
      </Component>
    );
  },
  Title: function DialogCommonTitle({
    children,
    innerRef,
    Component = DialogStyled.Title,
    closeButton = false,
    ...props
  }: MuiDialogTitleProps<"div"> & {
    innerRef?: Ref<unknown>;
    Component?: typeof DialogStyled.Title | ComponentType<any>;
    closeButton?: boolean;
  }) {
    return (
      <Component {...props} ref={innerRef as any} component="div">
        {children}
        {!closeButton ? null : <ButtonClose />}
      </Component>
    );
  },
  TitleText: styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "32px",
    color: theme.palette.primary.main,
  })) as ComponentType<TypographyProps>,
  Content: function DialogCommonContent({
    children,
    contentProps,
    innerRef,
    Component = DialogStyled.Content,
    ...props
  }: MuiDialogContentProps & {
    innerRef?: Ref<unknown>;
    contentProps?: Partial<GridProps>;
    Component?: typeof DialogStyled.Content | ComponentType<any>;
  }) {
    return (
      <Component {...props} ref={innerRef as any}>
        <Grid container width="100%" {...contentProps}>
          {children}
        </Grid>
      </Component>
    );
  },
  Actions: function DialogCommonActions({
    children,
    innerRef,
    contentProps,
    Component = DialogStyled.Actions,
    ...props
  }: MuiDialogActionsProps & {
    innerRef?: Ref<unknown>;
    contentProps?: Partial<GridProps>;
    Component?: typeof DialogStyled.Actions | ComponentType<any>;
  }) {
    return (
      <Component {...props} ref={innerRef as any}>
        <Grid container width="100%" {...contentProps}>
          {children}
        </Grid>
      </Component>
    );
  },
};
export default Dialog;

export type DialogProviderProps = Parameters<typeof Dialog.Provider>[0];

export type DialogPaperProps = Parameters<typeof Dialog.Paper>[0];

export type DialogTitleProps = Parameters<typeof Dialog.Title>[0];

export type DialogContentProps = Parameters<typeof Dialog.Content>[0];

export type DialogActionsProps = Parameters<typeof Dialog.Actions>[0];
