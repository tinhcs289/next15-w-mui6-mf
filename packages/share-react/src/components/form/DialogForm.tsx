"use client";

import type { DialogProps } from "@mui/material/Dialog";
import Dialog from "@mui/material/Dialog";
import type { AnyObject as Any } from "@repo/types/common";
import type { FormEventHandler } from "react";
import { useCallback, useEffect, useMemo } from "react";
import type { DefaultValues } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { DEFAULT_SUBMIT_REASON, useFormRef, ValuesInitializer } from "./base";
import type { DialogFormProps } from "./DialogForm.types";

/**
 * Mixing of React-hook-form and MUI Dialog.
 * @example
 * ```tsx
    import { DialogForm, FormSubmitCallback } from "@repo/share-react/components/form";

    type FormLoginValues = {
      username: string;
      password: string;
      ...
    }

    function DialogLogin() {
      const [open, setOpen] = useState<boolean>(false);

      const handleSubmit: FormSubmitCallback<FormLoginValues> = useCallback(
        ({
          values, // the values of form.
          reason, // the reason of submit event.
        }) => {
          // do something, e.g: perform api call with the values. then close dialog.
          setOpen(false);
        },
        []
      );

      return(
        <DialogForm
          open={open}
          onSubmitForm={handleSubmit}
          defaultValues={{
            username: "some-default-username",
            password: "some-default-password",
          }}
          ...
        >
          ...
        </DialogForm>
      );
    }
 * ```
 * For building form input components, please reference to the react-hook-form Controller pattern.
 * read more https://react-hook-form.com/docs/usecontroller/controller
 */
export default function DialogForm<Values extends Any = Any>({
  formType,
  fieldNamePrefix = '',
  open = false,
  values,
  defaultValues,
  onSubmitForm,
  onClose,
  formOptions,
  children,
  ...dialogProps
}: DialogFormProps<Values>) {
  const { dispatchSubmit, formRef, submitReasonRef } = useFormRef();

  const form = useForm<Values>({
    ...formOptions,
    defaultValues: { ...defaultValues } as DefaultValues<Values>,
  });

  const handleSubmitIntercept: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      form.handleSubmit((formValues) => {
        const reason = submitReasonRef?.current || DEFAULT_SUBMIT_REASON;
        onSubmitForm?.(formValues, reason);
        submitReasonRef.current = null;
      })(event);
    },
    [form.handleSubmit, onSubmitForm]
  );

  const handleCloseIntercept: DialogProps['onClose'] = useMemo(() => {
    if (!onClose) return undefined;
    return function resetFormWhenClose(...args) {
      form.reset({ ...(defaultValues as DefaultValues<Values>) });
      onClose(...args);
    }
  },[onClose, form.reset, defaultValues]);

  useEffect(
    function resetFormWhenOpenPropTurnsToFalse() {
      if (open) return;
      form.reset({ ...(defaultValues as DefaultValues<Values>) });
    },
    [open, defaultValues, form.reset]
  );

  return !open ? null : (
    <FormProvider
      {...({
        ...form,
        formType,
        fieldNamePrefix,
        dispatchSubmit,
        formRef,
        submitReasonRef,
      } as any)}
    >
      <ValuesInitializer values={values} defaultValues={defaultValues} />
      <Dialog
        open={open}
        scroll="paper"
        keepMounted={false}
        {...dialogProps}
        onClose={handleCloseIntercept}
        ref={formRef as any}
        component="form"
        // @ts-ignore
        noValidate
        // @ts-ignore
        onSubmit={handleSubmitIntercept}
      >
        {children}
      </Dialog>
    </FormProvider>
  );
}