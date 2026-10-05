import { render, screen } from "@testing-library/react";
import Reveal from "../components/Reveal";

describe("Reveal", () => {
  test("renders content in a visible wrapper without client animation logic", () => {
    const { container } = render(<Reveal><p>visible section</p></Reveal>);
    expect(screen.getByText("visible section")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("reveal-section");
    expect((container.firstChild as HTMLElement).style.opacity).toBe("");
  });

  test("forwards caller classes to the wrapper", () => {
    const { container } = render(<Reveal className="custom-section"><span>content</span></Reveal>);
    expect(container.firstChild).toHaveClass("reveal-section", "custom-section");
  });
});
