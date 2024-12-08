"use client";

import Grid from "@mui/material/Grid2";
import type { AnyObject as Any } from "@repo/types/common";
import type { FormEventHandler } from "react";
import { useCallback } from "react";
import type { DefaultValues } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { DEFAULT_SUBMIT_REASON, useFormRef, ValuesInitializer } from "./base";
import type { GridFormProps } from "./GridForm.types";

/**
 * Mixing of React-hook-form and MUI Grid (as container).
 * @example
 * ``` tsx
    import { GridForm, FormSubmitCallback } from "@repo/share-react/components/form";

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
export default function GridForm<Values extends Any = Any>({
  formType,
  fieldNamePrefix = '',
  values,
  defaultValues,
  onSubmitForm,
  formOptions,
  children,
  ...gridProps
}: GridFormProps<Values>) {
  const { dispatchSubmit, formRef, submitReasonRef } = useFormRef();

  const form = useForm<Values>({
    ...formOptions,
    defaultValues: defaultValues as DefaultValues<Values>,
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
        ref={formRef as any}
      >
        {children}
      </Grid>
    </FormProvider>
  );
}