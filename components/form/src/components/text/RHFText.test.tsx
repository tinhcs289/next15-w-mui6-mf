import { act, renderHook, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { PropsWithChildren } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { rules } from "../../rhf-rules";
import { textInputClasses } from "./InputText";
import RHFText from "./RHFText";

type FormValues = {
  username?: string;
};

const submitCallback = vi.fn();

const wrapper =
  (props?: { [x: string]: any }) =>
  ({ children }: PropsWithChildren) => {
    const methods = useForm<FormValues>({
      defaultValues: {
        username: "INIT_VALUE",
      },
    });

    const submitter = (values: FormValues) => {
      submitCallback(values);
    };

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitter)}>
          <RHFText {...props} control={methods.control} name="username" />
          {children}
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    );
  };

describe("RHFText", () => {
  it("should render InputText inside RHF Controller and init default value", async () => {
    const { result } = renderHook(
      () => {
        const { control } = useFormContext<FormValues>();
        const fieldValue = useWatch({ control, name: "username" });
        return { fieldValue };
      },
      { wrapper: wrapper() }
    );

    await waitFor(() => Boolean(result.current.fieldValue));

    const input = screen.getByRole("textbox");

    expect(input.closest(`.${textInputClasses.root}`)).toBeInTheDocument();
    expect(result.current.fieldValue).toBe("INIT_VALUE");
    expect(input).toHaveValue("INIT_VALUE");
  });

  it("should update form value when input has changed", async () => {
    const { result } = renderHook(
      () => {
        const { control } = useFormContext<FormValues>();
        const fieldValue = useWatch({ control, name: "username" });
        return { fieldValue };
      },
      { wrapper: wrapper() }
    );

    await waitFor(() => Boolean(result.current.fieldValue));

    const input = screen.getByRole("textbox");

    const user = userEvent.setup();
    await user.type(input, "_AND_NEW_VALUE");

    expect(result.current.fieldValue).toBe("INIT_VALUE_AND_NEW_VALUE");
    expect(input).toHaveValue("INIT_VALUE_AND_NEW_VALUE");
  });

  it("should update input value when form value has updated", async () => {
    const { result } = renderHook(
      () => {
        const { setValue } = useFormContext<FormValues>();
        return { setValue };
      },
      { wrapper: wrapper() }
    );

    await waitFor(() => Boolean(result.current.setValue));

    expect(result.current.setValue).toBeTypeOf("function");

    act(() => result.current.setValue!("username", "NEW_VALUE"));

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("NEW_VALUE");
  });

  it("should reset input value when form value has reset", async () => {
    const { result } = renderHook(
      () => {
        const { reset } = useFormContext<FormValues>();
        return { reset };
      },
      { wrapper: wrapper() }
    );

    await waitFor(() => Boolean(result.current.reset));

    expect(result.current.reset).toBeTypeOf("function");

    act(() => result.current.reset!());

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("INIT_VALUE");
  });

  it("should send value correctly to submitter", async () => {
    const { result } = renderHook(
      () => {
        const { control } = useFormContext<FormValues>();
        const fieldValue = useWatch({ control, name: "username" });
        return { fieldValue };
      },
      { wrapper: wrapper() }
    );

    await waitFor(() => Boolean(result.current.fieldValue));

    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");

    const user = userEvent.setup();
    await user.click(submitButton);
    expect(submitCallback).toHaveBeenCalledTimes(1);

    const args1 = submitCallback.mock.calls.at(0)?.[0];
    expect(args1).toStrictEqual({ username: "INIT_VALUE" });

    await user.type(input, "_AND_NEW_VALUE");
    await user.click(submitButton);
    expect(submitCallback).toHaveBeenCalledTimes(2);

    const args2 = submitCallback.mock.calls.at(1)?.[0];
    expect(args2).toStrictEqual({ username: "INIT_VALUE_AND_NEW_VALUE" });
  });

  it("should set `isDirty` correctly", async () => {
    const { result } = renderHook(
      () => {
        const { getFieldState, control } = useFormContext<FormValues>();
        const fieldValue = useWatch({ control, name: "username" });
        const { isDirty } = getFieldState("username");
        return { isDirty, fieldValue };
      },
      { wrapper: wrapper() }
    );

    await waitFor(() => Boolean(result.current));

    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    expect(result.current.isDirty).toBe(false);

    await user.type(input, "1");

    await waitFor(() => {
      expect(result.current.fieldValue === "INIT_VALUE1");
    });

    expect(result.current.isDirty).toBe(true);

    await user.clear(input);
    await user.type(input, "INIT_VALUE");

    expect(result.current.isDirty).toBe(false);
  });

  // FIXME
  it("should set `isTouched` correctly", async () => {
    const { result } = renderHook(
      () => {
        const { getFieldState } = useFormContext<FormValues>();
        const { isTouched } = getFieldState("username");
        return { isTouched };
      },
      { wrapper: wrapper() }
    );

    await waitFor(() => Boolean(result.current));
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    expect(result.current.isTouched).toBe(false);

    await user.tab();

    expect(input).toHaveFocus();
    expect(result.current.isTouched).toBe(true);

    await user.tab();

    expect(input).not.toHaveFocus();
    expect(result.current.isTouched).toBe(false);
  });

  // FIXME
  it("should validate with rule `required`", async () => {
    const { result } = renderHook(
      () => {
        const { control, getFieldState } = useFormContext<FormValues>();
        const fieldValue = useWatch({ control, name: "username" });
        const { error, invalid, isValidating } = getFieldState("username");
        return { fieldValue, error, invalid, isValidating };
      },
      { wrapper: wrapper({ rules: rules.required("Please enter") }) }
    );

    await waitFor(() => Boolean(result.current));

    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    const textfield = screen
      .getByRole("textbox")
      .closest(`.${textInputClasses.root}`);
    const submitButton = screen.getByRole("button");

    await user.clear(input);

    expect(input).toHaveValue("");
    expect(result.current.fieldValue).toBe("");

    await user.click(submitButton);

    expect(submitCallback).toHaveBeenCalledTimes(0);
    expect(result.current.invalid).toBe(true);
    expect(result.current.error?.message).toBe("Please enter");
    expect(screen.getByText("Please enter")).toBeInTheDocument();
    expect(textfield!.className).toContain("MuiError");

    await user.type(input, "NEW_VALUE");
    await user.click(submitButton);

    expect(submitCallback).toHaveBeenCalledTimes(1);
    expect(result.current.invalid).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(screen.getByText("Please enter")).not.toBeInTheDocument();
    expect(textfield!.className).not.toContain("MuiError");
  });
});
