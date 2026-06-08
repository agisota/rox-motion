/**
 * STATE-FIRST KIT — Demo data
 *
 * Stable example transitions used across showcases and Superset surfaces.
 * Static only — never wire these to a real DB or run migrations against them.
 */

import type { TraceEntry } from "../primitives/TraceConsole";

export interface MonadSpec {
  context: boolean;
  tools: boolean;
  rights: boolean;
  memory: boolean;
  constraints: boolean;
  criteria: boolean;
}

export interface StateFirstExample {
  id: string;
  label: string;
  /** current state */
  s0: string;
  /** target state */
  star: string;
  /** Δ = S* − S₀, as a short phrase */
  delta: string;
  /** intermediate transitions */
  transitions: string[];
  /** events that fire the transitions */
  events: string[];
  /** runtime tools required */
  runtime: string[];
  monad: MonadSpec;
  trace: TraceEntry[];
  /** validator criteria */
  validator: string[];
  /** the artifact that proves S* */
  artifact: string;
}

const fullMonad: MonadSpec = {
  context: true, tools: true, rights: true, memory: true, constraints: true, criteria: true,
};

export const stateFirstExamples: StateFirstExample[] = [
  {
    id: "fix-bug",
    label: "Fix a bug",
    s0: "bug reproduced",
    star: "tests passing",
    delta: "cause located + patched + covered",
    transitions: ["reproduce issue", "locate cause", "apply patch", "validate"],
    events: ["repo.cloned", "tool.read session.ts", "diff.written", "tests.passed"],
    runtime: ["repo", "shell"],
    monad: fullMonad,
    validator: ["tests green", "no regressions", "diff reviewed"],
    artifact: "PR #482 · +18 −6",
    trace: [
      { timestamp: "00.04", kind: "tr", event: "transition.opened", detail: "T1 · reproduce issue" },
      { timestamp: "00.21", kind: "ev", event: "event.received",    detail: "repo.cloned" },
      { timestamp: "03.12", kind: "ev", event: "tool.read",         detail: "src/auth/session.ts" },
      { timestamp: "05.51", kind: "ev", event: "diff.written",      detail: "+18 −6" },
      { timestamp: "07.02", kind: "ev", event: "tests.run",         detail: "142 passed" },
      { timestamp: "07.40", kind: "ok", event: "validator.passed",  detail: "S* reached · verified" },
    ],
  },
  {
    id: "write-prd",
    label: "Write a PRD",
    s0: "loose idea",
    star: "approved PRD",
    delta: "scoped + specified + signed off",
    transitions: ["gather context", "draft spec", "review", "approve"],
    events: ["docs.read", "draft.written", "comments.resolved", "approval.granted"],
    runtime: ["docs", "browser"],
    monad: { ...fullMonad, constraints: false },
    validator: ["scope agreed", "success metrics defined", "stakeholders signed"],
    artifact: "docs/prd/checkout-v2.md",
    trace: [
      { timestamp: "00.02", kind: "tr", event: "transition.opened", detail: "T1 · gather context" },
      { timestamp: "01.10", kind: "ev", event: "docs.read",         detail: "4 sources" },
      { timestamp: "04.30", kind: "ev", event: "draft.written",     detail: "2,100 words" },
      { timestamp: "08.15", kind: "warn", event: "validator.blocked", detail: "constraints missing" },
    ],
  },
  {
    id: "ship-landing",
    label: "Ship a landing page",
    s0: "design handoff",
    star: "deployed to prod",
    delta: "built + tested + released",
    transitions: ["scaffold", "implement", "test", "deploy"],
    events: ["repo.ready", "components.built", "tests.passed", "deploy.succeeded"],
    runtime: ["repo", "shell", "preview"],
    monad: fullMonad,
    validator: ["lighthouse ≥ 95", "no console errors", "responsive verified"],
    artifact: "https://preview.set.sh/state-first",
    trace: [
      { timestamp: "00.03", kind: "tr", event: "transition.opened", detail: "T · ship landing patch" },
      { timestamp: "00.40", kind: "ev", event: "runtime.ready",     detail: "repo + shell + preview" },
      { timestamp: "01.05", kind: "ev", event: "monad.check",       detail: "6/6 sufficient" },
      { timestamp: "03.22", kind: "ev", event: "diff.written",      detail: "+42 −11" },
      { timestamp: "05.00", kind: "ev", event: "tests.run",         detail: "142 passed" },
      { timestamp: "05.48", kind: "ok", event: "validator.passed",  detail: "S* reached" },
    ],
  },
  {
    id: "review-pr",
    label: "Review a PR",
    s0: "PR opened",
    star: "merge-ready",
    delta: "inspected + verified + approved",
    transitions: ["read diff", "run checks", "comment", "approve"],
    events: ["diff.loaded", "checks.green", "comments.posted", "approval.granted"],
    runtime: ["repo"],
    monad: fullMonad,
    validator: ["CI green", "criteria met", "no blocking comments"],
    artifact: "review: approved",
    trace: [
      { timestamp: "00.01", kind: "tr", event: "transition.opened", detail: "T · review PR #482" },
      { timestamp: "00.18", kind: "ev", event: "diff.loaded",       detail: "6 files" },
      { timestamp: "01.30", kind: "ev", event: "checks.green",      detail: "ci passed" },
      { timestamp: "02.10", kind: "ok", event: "validator.passed",  detail: "merge-ready" },
    ],
  },
];

export const DEFAULT_EXAMPLE: StateFirstExample = stateFirstExamples[0]!;

/** The nine ontology atoms, with color semantics. */
export const ontologyAtoms = [
  { id: "state",      name: "state · S",        color: "transition", def: "a complete description of what is true at a moment. stable, breathing." },
  { id: "target",     name: "target · S*",      color: "target",     def: "the destination the work must reach. the WHAT. verified, calm." },
  { id: "transition", name: "transition · T",   color: "transition", def: "a directed move from one state to another. it owns the work." },
  { id: "event",      name: "event · e",        color: "runtime",    def: "a discrete trigger. events are what cause transitions to fire." },
  { id: "runtime",    name: "runtime · R",      color: "runtime",    def: "the environment a transition executes in: repo, shell, browser, db." },
  { id: "monad",      name: "monad · M",        color: "target",     def: "everything required for a transition: context, tools, rights, criteria." },
  { id: "trace",      name: "trace · τ",        color: "runtime",    def: "the recorded stream of events that proves the transition occurred." },
  { id: "validator",  name: "validator · V",    color: "target",     def: "a gate that opens only when S* criteria pass. proof, not vibes." },
  { id: "agent",      name: "agent · vehicle",  color: "friction",   def: "a vehicle that executes a transition. it serves the path — it is not the work." },
] as const;
