import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Surface } from "../primitives/Surface";
import { Button } from "../primitives/Button";
import { surfaceVariants } from "../primitives/Surface";
import { buttonVariants } from "../primitives/Button";

afterEach(cleanup);

describe("cva variant primitives", () => {
  it("Surface composes variant/tone/density classes", () => {
    const cls = surfaceVariants({ variant: "glass", tone: "target", density: "compact" });
    expect(cls).toContain("sf-surface");
    expect(cls).toContain("sf-surface--glass");
    expect(cls).toContain("sf-surface--target");
    expect(cls).toContain("sf-surface--compact");
  });

  it("Button defaults to primary/target/md", () => {
    const cls = buttonVariants({});
    expect(cls).toContain("sf-btn--primary");
    expect(cls).toContain("sf-btn--target");
    expect(cls).toContain("sf-btn--md");
  });

  it("renders and forwards children + props", () => {
    render(
      <Surface variant="glass" data-testid="surf">
        <Button tone="transition" variant="ghost">go</Button>
      </Surface>
    );
    expect(screen.getByTestId("surf").className).toContain("sf-surface--glass");
    const btn = screen.getByRole("button", { name: "go" });
    expect(btn.className).toContain("sf-btn--ghost");
    expect(btn.className).toContain("sf-btn--transition");
    expect(btn.getAttribute("type")).toBe("button");
  });
});
