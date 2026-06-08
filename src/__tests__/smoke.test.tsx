import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import { MotionProvider } from "../providers/MotionProvider";
import { FontThemeProvider } from "../providers/FontThemeProvider";
import { StateFirstPage } from "../StateFirstPage";
import { sceneRegistry } from "../scene-registry";
import { stateFirstScenes } from "../data/scenes";
import {
  StateCard, TransitionRail, MonadCapsule, RunButton, FontThemeSwitch,
  MotionControl, WorkspaceStateCard, TraceConsole, AgentRunHeader, DEMO_TRACE,
} from "../index";

afterEach(cleanup);

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider defaultLevel="off">
      <FontThemeProvider>{children}</FontThemeProvider>
    </MotionProvider>
  );
}

describe("registry coverage", () => {
  it("maps every scene componentName (except the page-level Hero) to a component", () => {
    const missing = stateFirstScenes
      .filter((s) => s.componentName !== "HeroSection")
      .filter((s) => !(s.componentName in sceneRegistry));
    expect(missing.map((s) => s.componentName)).toEqual([]);
  });

  it("every registry entry is a function component", () => {
    for (const Cmp of Object.values(sceneRegistry)) {
      expect(typeof Cmp).toBe("function");
    }
  });
});

describe("component smoke test — everything mounts without throwing", () => {
  it("renders all primitives", () => {
    render(
      <Wrap>
        <StateCard kind="s0" label="S₀" value="bug reproduced" detail="tests red" />
        <StateCard kind="star" label="S*" value="tests passing" />
        <TransitionRail from={{ label: "S₀", value: "now" }} to={{ label: "S*", value: "target" }} />
        <MonadCapsule slots={[{ label: "context", complete: true }, { label: "tools", complete: false }]} />
        <RunButton showTrace />
        <FontThemeSwitch />
        <MotionControl />
        <WorkspaceStateCard workspace={{ branch: "feat/x" }} currentState="a" targetState="b" progress={50} />
        <TraceConsole entries={DEMO_TRACE} />
        <AgentRunHeader transition="T2 · fix" runtime={["repo"]} monadSufficiency={{ complete: 6, total: 6 }} traceStatus="recording" validatorStatus="pending" />
      </Wrap>
    );
    expect(screen.getByText("bug reproduced")).toBeTruthy();
  });

  it("renders the FULL assembled page (all 50 scenes) without throwing", () => {
    // withProviders=false → drive motion "off" so no ambient timers run in jsdom
    render(
      <Wrap>
        <StateFirstPage withProviders={false} />
      </Wrap>
    );
    expect(screen.getByText("we design the state.")).toBeTruthy();
    // cluster labels appear in both the nav and the section headings
    expect(screen.getAllByText("Superset Integration").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Component Library").length).toBeGreaterThan(0);
  });
});
