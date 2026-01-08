import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InputText, { textInputClasses } from "./InputText";

const getTextField = () =>
  screen.getByRole("textbox").closest(`.${textInputClasses.root}`);

describe("InputText", () => {
  it("should render when minimal props provided", () => {
    render(<InputText />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDefined();
  });

  it("should forward ref correctly", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<InputText ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should render label inside StyledComponent when variant is not bootstrap", () => {
    render(<InputText label="Normal Label" />);
    expect(screen.getByText("Normal Label")).toBeInTheDocument();
  });

  it("should wrap with FormControlWrapper when variant=bootstrap", () => {
    const { container } = render(
      <InputText variant="bootstrap" label="Name" required error />
    );

    const formControl = container.querySelector(".MuiFormControl-root");
    expect(formControl).toBeInTheDocument();

    expect(screen.getByText("Name").tagName).toBe("LABEL");

    const label = container.querySelector(
      ".MuiFormControl-root > .MuiFormLabel-root"
    );
    expect(label).toBeInTheDocument();
    expect(label).toContainHTML("Name");
    expect(label!.className).toContain("Mui-required");
    expect(label!.className).toContain("Mui-error");
  });

  it("should render outlined textfield when variant=bootstrap", () => {
    render(<InputText variant="bootstrap" />);
    const el = screen.getByRole("textbox").closest("div");
    expect(el?.className).toContain("MuiOutlinedInput-root");
  });

  it("should add start icon class when startAdornment exists", () => {
    render(
      <InputText slotProps={{ input: { startAdornment: <div>pre</div> } }} />
    );
    const root = getTextField();
    expect(root?.className).toContain(textInputClasses.hasStartIcon);
  });

  it("should add end icon class when endAdornment exists", () => {
    render(
      <InputText slotProps={{ input: { endAdornment: <div>post</div> } }} />
    );
    const root = getTextField();
    expect(root?.className).toContain(textInputClasses.hasEndIcon);
  });

  it("should append error adornment when errorText and error=true", () => {
    render(<InputText error errorText="Wrong" />);
    expect(screen.getByText("Wrong")).toBeInTheDocument();
  });

  it("should merge endAdornment with errorAdornment", () => {
    render(
      <InputText
        error
        errorText="Err"
        slotProps={{ input: { endAdornment: <span>End</span> } }}
      />
    );
    expect(screen.getByText("End")).toBeInTheDocument();
    expect(screen.getByText("Err")).toBeInTheDocument();
  });

  it("should set htmlInput.notched = 'false'", () => {
    render(<InputText />);
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("notched")).toBe("false");
  });

  it("should preserve htmlInput props", () => {
    render(<InputText slotProps={{ htmlInput: { "data-x": "1" } }} />);
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("data-x")).toBe("1");
  });

  it("should not override startAdornment when adding errorAdornment", () => {
    render(
      <InputText
        error
        errorText="X"
        slotProps={{ input: { startAdornment: <span>A</span> } }}
      />
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("should merge classNameProp", () => {
    render(<InputText className="custom" />);
    const el = getTextField();
    expect(el?.className).toContain("custom");
  });

  it("should add textarea class when multiline", () => {
    render(<InputText multiline />);
    const el = getTextField();
    expect(el?.className).toContain(textInputClasses.textarea);
  });
});