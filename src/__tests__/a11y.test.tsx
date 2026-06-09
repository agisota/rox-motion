import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import axe from "axe-core";
import { MotionProvider } from "../providers/MotionProvider";
import { FontThemeProvider } from "../providers/FontThemeProvider";
import { ColorThemeProvider } from "../providers/ColorThemeProvider";
import {
  FontThemeSwitch, ColorThemeSwitch, MotionControl, SoundToggle, Button,
  WorkspaceStateCard, AgentRunHeader,
} from "../index";

afterEach(cleanup);

// jsdom has no layout, so contrast/region rules can't run — scope to the
// component-level a11y rules that DO work: accessible names, roles, aria.
const COMPONENT_RULES = [
  "button-name", "link-name", "image-alt",
  "aria-required-attr", "aria-valid-attr", "aria-valid-attr-value",
  "aria-roles", "label", "list", "listitem",
];

describe("accessibility (axe)", () => {
  it("flagship controls have no component-level violations", async () => {
    const { container } = render(
      <ColorThemeProvider>
        <MotionProvider defaultLevel="off">
          <FontThemeProvider>
            <main>
              <FontThemeSwitch />
              <ColorThemeSwitch />
              <MotionControl />
              <SoundToggle />
              <Button tone="target">run transition</Button>
              <WorkspaceStateCard workspace={{ branch: "feat/x" }} currentState="a" targetState="b" progress={50} />
              <AgentRunHeader transition="T2" runtime={["repo"]} monadSufficiency={{ complete: 6, total: 6 }} traceStatus="recording" validatorStatus="pending" />
            </main>
          </FontThemeProvider>
        </MotionProvider>
      </ColorThemeProvider>
    );

    const results = await axe.run(container, {
      runOnly: { type: "rule", values: COMPONENT_RULES },
    });
    const messages = results.violations.map((v) => `${v.id}: ${v.help}`);
    expect(messages).toEqual([]);
  });
});
