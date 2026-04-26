import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FormControlWrapper from "./FormControlWrapper";
import textInputClasses from "./textInputClasses";

describe("FormControlWrapper", () => {
  it("should render children without FormControl when variant is not bootstrap", () => {
    const { container } = render(
      <FormControlWrapper>
        <input type="text" data-testid="test-input" />
      </FormControlWrapper>
    );

    const input = screen.getByTestId("test-input");
    expect(input).toBeInTheDocument();

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).not.toBeInTheDocument();
  });

  it("should render children without FormControl when variant is undefined", () => {
    const { container } = render(
      <FormControlWrapper variant={undefined}>
        <input type="text" data-testid="test-input" />
      </FormControlWrapper>
    );

    const input = screen.getByTestId("test-input");
    expect(input).toBeInTheDocument();

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).not.toBeInTheDocument();
  });

  it("should wrap with FormControl when variant is bootstrap", () => {
    const { container } = render(
      <FormControlWrapper variant="bootstrap">
        <input type="text" data-testid="test-input" />
      </FormControlWrapper>
    );

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toBeInTheDocument();
    expect(formControl?.className).toContain(
      textInputClasses.bootstrapFormControl
    );

    const input = screen.getByTestId("test-input");
    expect(input).toBeInTheDocument();
  });

  it("should render label with bootstrap variant", () => {
    render(
      <FormControlWrapper variant="bootstrap" label="Test Label">
        <input type="text" data-testid="test-input" />
      </FormControlWrapper>
    );

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe("LABEL");
  });

  it("should apply label className when variant is bootstrap", () => {
    const { container } = render(
      <FormControlWrapper variant="bootstrap" label="Test">
        <input />
      </FormControlWrapper>
    );

    const label = container.querySelector(".MuiFormLabel-root");
    expect(label?.className).toContain(textInputClasses.bootstrapFormLabel);
  });

  it("should set required attribute on FormControl when variant is bootstrap and required=true", () => {
    const { container } = render(
      <FormControlWrapper variant="bootstrap" required>
        <input />
      </FormControlWrapper>
    );

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toHaveAttribute("required");
    expect(formControl?.className).toContain("Mui-required");
  });

  it("should set error attribute on FormControl when variant is bootstrap and error=true", () => {
    const { container } = render(
      <FormControlWrapper variant="bootstrap" error>
        <input />
      </FormControlWrapper>
    );

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl?.className).toContain("Mui-error");
  });

  it("should apply size prop to FormControl when variant is bootstrap", () => {
    const { container } = render(
      <FormControlWrapper variant="bootstrap" size="medium">
        <input />
      </FormControlWrapper>
    );

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toHaveAttribute("size", "medium");
  });

  it("should have fullWidth on FormControl when variant is bootstrap", () => {
    const { container } = render(
      <FormControlWrapper variant="bootstrap">
        <input />
      </FormControlWrapper>
    );

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl?.className).toContain("MuiFormControl-fullWidth");
  });

  it("should render multiple children when variant is bootstrap", () => {
    const { container } = render(
      <FormControlWrapper variant="bootstrap">
        <input type="text" data-testid="input-1" />
        <input type="text" data-testid="input-2" />
      </FormControlWrapper>
    );

    const input1 = screen.getByTestId("input-1");
    const input2 = screen.getByTestId("input-2");

    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toBeInTheDocument();
  });

  it("should render ReactNode as label", () => {
    render(
      <FormControlWrapper
        variant="bootstrap"
        label={
          <span data-testid="custom-label">
            Custom <strong>Label</strong>
          </span>
        }
      >
        <input />
      </FormControlWrapper>
    );

    expect(screen.getByTestId("custom-label")).toBeInTheDocument();
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("should use default values for optional props", () => {
    const { container } = render(
      <FormControlWrapper>
        <input />
      </FormControlWrapper>
    );

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).not.toBeInTheDocument();
  });

  it("should set all FormControl props together when variant is bootstrap", () => {
    const { container } = render(
      <FormControlWrapper
        variant="bootstrap"
        label="Full Test"
        required
        error
        size="small"
      >
        <input type="text" data-testid="test-input" />
      </FormControlWrapper>
    );

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toBeInTheDocument();
    expect(formControl).toHaveAttribute("required");
    expect(formControl).toHaveAttribute("size", "small");
    expect(formControl?.className).toContain("Mui-error");
    expect(formControl?.className).toContain("MuiFormControl-fullWidth");

    expect(screen.getByText("Full Test")).toBeInTheDocument();
    expect(screen.getByTestId("test-input")).toBeInTheDocument();
  });

  it("should render label with proper styling when variant is bootstrap", () => {
    const { container } = render(
      <FormControlWrapper variant="bootstrap" label="Styled Label">
        <input />
      </FormControlWrapper>
    );

    const label = container.querySelector(".MuiFormLabel-root");
    expect((label as HTMLElement)?.style.fontWeight).toBe("600");
    expect((label as HTMLElement)?.style.marginBottom).toBe("4px");
  });
});
