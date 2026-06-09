import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);
import { FontThemeProvider, useFontTheme } from "../providers/FontThemeProvider";
import { MotionProvider, useMotionLevel } from "../providers/MotionProvider";
import { ColorThemeProvider, useColorTheme } from "../providers/ColorThemeProvider";

function FontProbe() {
  const { theme, setTheme } = useFontTheme();
  return (
    <div>
      <span data-testid="font">{theme}</span>
      <button onClick={() => setTheme("bebas")}>bebas</button>
    </div>
  );
}

function MotionProbe() {
  const { level, setLevel } = useMotionLevel();
  return (
    <div>
      <span data-testid="motion">{level}</span>
      <button onClick={() => setLevel("off")}>off</button>
    </div>
  );
}

describe("FontThemeProvider", () => {
  beforeEach(() => localStorage.clear());

  it("defaults to victor and sets the html attribute", () => {
    render(
      <FontThemeProvider>
        <FontProbe />
      </FontThemeProvider>
    );
    expect(screen.getByTestId("font").textContent).toBe("victor");
    expect(document.documentElement.getAttribute("data-sf-font")).toBe("victor");
  });

  it("stores and restores the selected theme", () => {
    const { unmount } = render(
      <FontThemeProvider>
        <FontProbe />
      </FontThemeProvider>
    );
    fireEvent.click(screen.getByText("bebas"));
    expect(localStorage.getItem("sf-font")).toBe("bebas");
    expect(document.documentElement.getAttribute("data-sf-font")).toBe("bebas");
    unmount();

    render(
      <FontThemeProvider>
        <FontProbe />
      </FontThemeProvider>
    );
    expect(screen.getByTestId("font").textContent).toBe("bebas");
  });
});

function ColorProbe() {
  const { theme, setTheme } = useColorTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme("light")}>light</button>
      <button onClick={() => setTheme("hc")}>hc</button>
    </div>
  );
}

describe("ColorThemeProvider", () => {
  beforeEach(() => localStorage.clear());

  it("defaults to dark and reflects on <html>", () => {
    render(
      <ColorThemeProvider>
        <ColorProbe />
      </ColorThemeProvider>
    );
    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-sf-theme")).toBe("dark");
  });

  it("switches and persists light / high-contrast", () => {
    render(
      <ColorThemeProvider>
        <ColorProbe />
      </ColorThemeProvider>
    );
    fireEvent.click(screen.getByText("light"));
    expect(localStorage.getItem("sf-theme")).toBe("light");
    expect(document.documentElement.getAttribute("data-sf-theme")).toBe("light");
    fireEvent.click(screen.getByText("hc"));
    expect(document.documentElement.getAttribute("data-sf-theme")).toBe("hc");
  });
});

describe("MotionProvider", () => {
  beforeEach(() => localStorage.clear());

  it("defaults to full and persists an override", () => {
    render(
      <MotionProvider>
        <MotionProbe />
      </MotionProvider>
    );
    expect(screen.getByTestId("motion").textContent).toBe("full");
    fireEvent.click(screen.getByText("off"));
    expect(screen.getByTestId("motion").textContent).toBe("off");
    expect(localStorage.getItem("sf-motion")).toBe("off");
    expect(document.body.classList.contains("sf-motion-off")).toBe(true);
  });
});
