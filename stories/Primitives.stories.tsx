/** ROX UI — Ladle stories: primitives. Each named export is a story. */
import {
  Button, Surface, RunButton, MonadCapsule, TransitionRail, StateCard,
  WorkspaceStateCard, AgentRunHeader, TraceConsole, DEMO_TRACE,
  FontThemeSwitch, ColorThemeSwitch, MotionControl, SoundToggle,
} from "../src/index";

export const Buttons = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <Button variant="primary" tone="target">run transition</Button>
    <Button variant="ghost" tone="transition">cancel</Button>
    <Button variant="glass" tone="runtime">open runtime</Button>
    <Button variant="primary" tone="neutral" size="sm">small</Button>
    <Button variant="ghost" tone="target" size="lg" disabled>disabled</Button>
  </div>
);

export const Surfaces = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
    <Surface variant="solid" tone="neutral">solid</Surface>
    <Surface variant="glass" tone="target">glass · target</Surface>
    <Surface variant="glass" tone="runtime" density="compact">glass · compact</Surface>
  </div>
);

export const RunButtonStory = () => <RunButton autoPlay={false} />;

export const Monad = () => (
  <div style={{ maxWidth: 420 }}>
    <MonadCapsule slots={[
      { label: "context", complete: true }, { label: "tools", complete: true },
      { label: "rights", complete: false }, { label: "criteria", complete: true },
    ]} />
  </div>
);

export const Rail = () => (
  <div className="sf-stage" style={{ maxWidth: 520 }}>
    <TransitionRail from={{ label: "S₀", value: "bug reproduced" }} to={{ label: "S*", value: "tests passing" }} />
  </div>
);

export const States = () => (
  <div style={{ display: "flex", gap: 12 }}>
    <StateCard kind="s0" label="S₀" value="bug reproduced" detail="tests red" />
    <StateCard kind="star" label="S*" value="tests passing" detail="shipped" />
  </div>
);

export const Workspace = () => (
  <div style={{ maxWidth: 520 }}>
    <WorkspaceStateCard
      workspace={{ branch: "feat/auth-fix", worktree: "wt-01" }}
      currentState="bug reproduced" targetState="tests passing"
      activeTransition="patch" traceStatus="recording" validatorStatus="pending" progress={62}
    />
  </div>
);

export const RunHeader = () => (
  <AgentRunHeader transition="T2 · implement fix" runtime={["repo", "shell"]} monadSufficiency={{ complete: 8, total: 10 }} traceStatus="recording" validatorStatus="not run" />
);

export const Trace = () => (
  <div className="sf-card" style={{ maxWidth: 520, padding: 16 }}>
    <TraceConsole entries={DEMO_TRACE} />
  </div>
);

export const Switches = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <FontThemeSwitch />
    <ColorThemeSwitch />
    <MotionControl />
    <SoundToggle />
  </div>
);
