import { fireEvent, render, screen } from "@testing-library/react";
import CommandPalette from "../components/CommandPalette";
import { ThemeProvider } from "../components/ThemeProvider";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));

describe("command palette", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }),
    });
  });

  beforeEach(() => mockPush.mockClear());

  test("opens with Ctrl+K, filters commands, and navigates by keyboard", () => {
    render(<ThemeProvider><CommandPalette /></ThemeProvider>);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(screen.getByRole("dialog", { name: "Portfolio commands" })).toBeInTheDocument();

    const search = screen.getByRole("textbox", { name: "Search pages and actions" });
    fireEvent.change(search, { target: { value: "projects" } });
    fireEvent.keyDown(search, { key: "Enter" });

    expect(mockPush).toHaveBeenCalledWith("/projects");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("closes with Escape", () => {
    render(<ThemeProvider><CommandPalette /></ThemeProvider>);
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
