"use client";

import Grid from "@mui/material/Grid";
import type { FormEventHandler, JSX } from "react";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import type { DefaultValues } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { DEFAULT_SUBMIT_REASON } from "./constants";
import { ValuesInitializer } from "./init-values";
import type { Any, FormGridProps } from "./types";
import { useFormRef } from "./use-form-ref";

/**
 * Mixing of React-hook-form and MUI Grid (as container).
 * @example
 * ``` tsx
    import { GridForm, FormSubmitCallback } from "@shared/form";

    type FormLoginValues = {
      username: string;
      password: string;
      ...
    }

    function LoginForm() {
      const handleSubmit: FormSubmitCallback<FormLoginValues> = useCallback(
        ({
          values, // the values of form.
          reason, // the reason of submit event.
        }) => {
          // do something, e.g: perform api call with the values.
        },
        []
      );

      return(
        <GridForm
          onSubmitForm={handleSubmit}
          defaultValues={{
            username: "some-default-username",
            password: "some-default-password",
          }}
          ...
        >
          ...
        </GridForm>
      );
    }
 * ```
 * For building form input components, please reference to the react-hook-form Controller pattern.
 * read more https://react-hook-form.com/docs/usecontroller/controller
 */
export const FormGrid = forwardRef<HTMLFormElement, FormGridProps>(({
  formType,
  fieldNamePrefix = "",
  values,
  defaultValues,
  onSubmitForm,
  formOptions,
  children,
  ...gridProps
}, ref) => {
  const { dispatchSubmit, formRef, submitReasonRef } = useFormRef();
  useImperativeHandle(ref, () => formRef.current!, []);

  const form = useForm<Any>({
    ...formOptions,
    defaultValues: defaultValues as DefaultValues<Any>,
  });

  const handleSubmitIntercept: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      form.handleSubmit(function (formData) {
        const reason = submitReasonRef?.current || DEFAULT_SUBMIT_REASON;
        onSubmitForm?.(formData, reason);
        submitReasonRef.current = null;
      })(event);
    },
    [form.handleSubmit, onSubmitForm]
  );

  return (
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
      <Grid
        noValidate
        width="100%"
        alignItems="flex-start"
        {...gridProps}
        container
        component="form"
        onSubmit={handleSubmitIntercept}
        ref={formRef}
      >
        {children}
      </Grid>
    </FormProvider>
  );
}) as <Values extends Any = Any>(props: FormGridProps<Values>) => JSX.Element;
// @ts-ignore
FormGrid.displayName = "FormGrid";
