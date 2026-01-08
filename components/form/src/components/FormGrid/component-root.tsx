"use client";

import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import type { ComponentType, FormEventHandler, JSX, RefObject } from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import type {
  DefaultValues,
  FieldValues,
  FormProviderProps,
} from "react-hook-form";
import {
  FormProvider,
  useForm,
  useFormContext as useRHFContext,
} from "react-hook-form";
import isEqual from "../../helpers/isEqual";
import usePrevious from "../../helpers/usePrevious";

export type PlainObject = { [x: string]: any };

export type FormType =
  | "creation"
  | "edits"
  | "readonly"
  | "viewonly"
  | "search-filter";

export type FormSubmitCallback<Values extends PlainObject = PlainObject> = (
  values: Partial<Values>,
  reason?: string
) => void | Promise<void>;

type UseFormParams<Values extends PlainObject = PlainObject> = Partial<
  Parameters<typeof useForm<Values>>[0]
>;

export type FormProps<
  RootComponentProps extends PlainObject = PlainObject,
  Values extends PlainObject = PlainObject,
> = Partial<RootComponentProps> & {
  /**
   * @default "creation"
   */
  formType?: FormType;
  fieldNamePrefix?: string;
  values?: Partial<Values>;
  defaultValues?: Partial<Values>;
  onSubmitForm?: FormSubmitCallback<Values>;
  formOptions?: UseFormParams<Values>;
};

export type UseFormContextReturns<Values extends PlainObject = PlainObject> =
  ReturnType<typeof useRHFContext<Values>> & {
    formType?: FormType;
    fieldNamePrefix?: string;
    formRef?: RefObject<HTMLFormElement | undefined>;
    dispatchSubmit?: (reason?: string) => void;
  };

export type FormGridProps<Values extends PlainObject = PlainObject> = FormProps<
  GridProps<"form">,
  Values
>;

function ValuesInitializer<T extends FieldValues = FieldValues>({
  values,
  defaultValues,
}: {
  values?: Partial<T>;
  defaultValues?: Partial<T>;
}) {
  const preValues = usePrevious(values);
  const preDefaultValues = usePrevious(defaultValues);
  const { reset, getValues } = useRHFContext<T>();

  useEffect(
    function updateFormValuesWhenDefaultValuesPropChanges() {
      if (isEqual(defaultValues, preDefaultValues)) return;
      const currentValues = getValues();
      if (isEqual(defaultValues, currentValues)) return;
      const newValues = { ...defaultValues, ...currentValues };
      reset(newValues);
    },
    [defaultValues]
  );

  useEffect(
    function updateFormValuesWhenValuesPropChanges() {
      if (isEqual(values, preValues)) return;
      const currentValues = getValues();
      if (isEqual(values, currentValues)) return;
      const newValues = { ...currentValues, ...values };
      reset(newValues);
    },
    [values]
  );

  return null as unknown as JSX.Element;
}

const DEFAULT_SUBMIT_REASON = "main-action";

function useFormRef() {
  const formRef = useRef<HTMLFormElement>(null);

  const submitReasonRef = useRef<string | null | undefined>(
    DEFAULT_SUBMIT_REASON
  );

  const dispatchSubmit = useCallback((reason?: string) => {
    if (!formRef?.current?.dispatchEvent) return;

    const CustomFormSubmitEvent = new Event("submit", {
      cancelable: true,
      bubbles: true,
    });

    submitReasonRef.current = reason || DEFAULT_SUBMIT_REASON;
    formRef.current.dispatchEvent(CustomFormSubmitEvent);
  }, []);

  return { formRef, submitReasonRef, dispatchSubmit };
}

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
export const FormGrid = forwardRef<HTMLFormElement, FormGridProps>(
  (
    {
      formType = "creation",
      fieldNamePrefix = "",
      values,
      defaultValues,
      onSubmitForm,
      formOptions,
      children,
      ...gridProps
    },
    ref
  ) => {
    const { dispatchSubmit, formRef, submitReasonRef } = useFormRef();
    useImperativeHandle(ref, () => formRef.current!, []);

    const form = useForm<PlainObject>({
      ...formOptions,
      defaultValues: defaultValues as DefaultValues<PlainObject>,
    });

    const handleSubmitIntercept: FormEventHandler<HTMLFormElement> =
      useCallback(
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
        } as unknown as FormProviderProps)}
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
  }
) as <Values extends PlainObject = PlainObject>(
  props: FormGridProps<Values>
) => JSX.Element;
(FormGrid as ComponentType).displayName = "FormGrid";

export function useFormContext<Values extends PlainObject = PlainObject>() {
  return useRHFContext() as unknown as UseFormContextReturns<Values>;
}
