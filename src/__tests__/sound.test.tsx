import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, renderHook, act } from "@testing-library/react";
import { useStateSound } from "../hooks/useStateSound";
import { SoundToggle } from "../primitives/SoundToggle";

afterEach(cleanup);

describe("useStateSound (opt-in, off by default)", () => {
  beforeEach(() => localStorage.clear());

  it("is disabled by default", () => {
    const { result } = renderHook(() => useStateSound());
    expect(result.current.enabled).toBe(false);
  });

  it("enabling persists to localStorage", () => {
    const { result } = renderHook(() => useStateSound());
    act(() => result.current.setEnabled(true));
    expect(localStorage.getItem("sf-sound")).toBe("on");
    expect(result.current.enabled).toBe(true);
  });

  it("play() never throws even without WebAudio (jsdom)", () => {
    const { result } = renderHook(() => useStateSound());
    act(() => result.current.setEnabled(true));
    expect(() => act(() => result.current.play("validated"))).not.toThrow();
  });

  it("SoundToggle reflects + flips state", () => {
    render(<SoundToggle />);
    const btn = screen.getByRole("button", { name: "state sounds" });
    expect(btn.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });
});
