import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../src/components/Button";

// This test suite verifies the functionality of the Button component.
// It ensures that the component renders correctly, handles user interactions,
// and applies the appropriate props and attributes.

describe("Button Component", () => {
  // Test case: Verify that the Button component renders with the correct label.
  it("renders the button with the correct label", () => {
    const { getByText } = render(
      <Button label="Click Me" onClick={() => {}} />,
    );
    // Assert that the button with the label "Click Me" is present in the document.
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  // Test case: Verify that the onClick handler is called when the button is clicked.
  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button label="Click Me" onClick={handleClick} />,
    );
    const button = getByText("Click Me");
    // Simulate a click event on the button.
    fireEvent.click(button);
    // Assert that the onClick handler was called exactly once.
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test case: Verify that the button is disabled when the disabled prop is set to true.
  it("is disabled when the disabled prop is true", () => {
    const { getByText } = render(
      <Button label="Click Me" onClick={() => {}} disabled />,
    );
    const button = getByText("Click Me");
    // Assert that the button is disabled.
    expect(button).toBeDisabled();
  });

  // Test case: Verify that additional class names are applied when passed via the className prop.
  it("applies additional class names passed via the className prop", () => {
    const { getByText } = render(
      <Button label="Click Me" onClick={() => {}} className="extra-class" />,
    );
    const button = getByText("Click Me");
    // Assert that the button has the additional class name "extra-class".
    expect(button).toHaveClass("extra-class");
  });

  // Test case: Verify that the button renders with the correct type attribute.
  it("renders with the correct type attribute", () => {
    const { getByText } = render(
      <Button label="Submit" onClick={() => {}} type="submit" />,
    );
    const button = getByText("Submit");
    // Assert that the button has the type attribute set to "submit".
    expect(button).toHaveAttribute("type", "submit");
  });
});
