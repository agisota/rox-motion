/**
 * STATE-FIRST KIT — Scene registry
 *
 * The single source of truth for the /state-first landing page and the
 * implementation roadmap. Exactly 50 scenes, grouped into 6 clusters.
 *
 * Kept as PURE DATA (no component imports) so it can't create import cycles
 * and is trivially testable. The landing page maps `componentName` → an
 * implemented component via a lookup table; `status` tells you what's built.
 */

export type SceneCluster =
  | "manifesto"
  | "mechanics"
  | "metaphor"
  | "product"
  | "superset"
  | "library";

export type SceneStatus = "ready" | "todo";

export interface StateFirstScene {
  /** stable anchor id, e.g. "state-first-landing-hero" */
  id: string;
  /** 1-50 ordering */
  number: number;
  title: string;
  cluster: SceneCluster;
  /** one-line description of what the scene shows */
  description: string;
  /** the state-first concept it encodes */
  concept: string;
  /** where it lands in the real Superset app */
  reuseTargets: string[];
  /** Motion techniques the implementation should use */
  motionTechniques: string[];
  /** name of the React component that renders it (mapped on the page) */
  componentName: string;
  /** whether the component exists in this kit yet */
  status: SceneStatus;
}

export const stateFirstScenes: StateFirstScene[] = [
  // ── manifesto ──
  { number: 1, id: "state-first-landing-hero", title: "State-First Landing Hero", cluster: "manifesto",
    description: "S₀ → T → S* machine with monad, runtime, trace, validator.",
    concept: "work is a controlled transition", reuseTargets: ["marketing homepage", "docs intro", "onboarding"],
    motionTechniques: ["pathLength", "springs", "viewport stagger", "moving signal"], componentName: "HeroSection", status: "ready" },
  { number: 2, id: "what-before-how", title: "What Before How Split", cluster: "manifesto",
    description: "how-first tool cloud vs state-first rail; focus toggle morphs task? → S*.",
    concept: "the harness answers HOW, the target answers WHAT", reuseTargets: ["manifesto block", "educational modal"],
    motionTechniques: ["LayoutGroup", "layoutId", "AnimatePresence", "spring morph"], componentName: "WhatBeforeHowSplit", status: "ready" },
  { number: 3, id: "core-formula", title: "Core Formula S₀→T→S*", cluster: "manifesto",
    description: "the living work equation.", concept: "work = S₀ → T → S*",
    reuseTargets: ["docs", "empty states", "command palette help"], motionTechniques: ["staggerChildren", "fadeUp"], componentName: "CoreFormula", status: "ready" },
  { number: 4, id: "delta-equation", title: "Delta Equation Δ = S* − S₀", cluster: "manifesto",
    description: "the gap between current and target.", concept: "Δ = S* − S₀",
    reuseTargets: ["new workspace task decomposition"], motionTechniques: ["fadeUp", "number tween"], componentName: "DeltaDecomposition", status: "ready" },
  { number: 5, id: "state-atom-grid", title: "State Atom Grid", cluster: "manifesto",
    description: "the nine ontology atoms, hover to define.", concept: "every surface is built from these atoms",
    reuseTargets: ["component library", "docs glossary"], motionTechniques: ["hover reveal", "breathe loop"], componentName: "StateAtomGrid", status: "ready" },

  // ── mechanics ──
  { number: 6, id: "target-state-gravity", title: "Target State Gravity", cluster: "metaphor",
    description: "S* as the attractor organizing the tools.", concept: "the target organizes the work",
    reuseTargets: ["landing visual", "product philosophy"], motionTechniques: ["orbit", "pointer glow"], componentName: "GravityField", status: "ready" },
  { number: 7, id: "tool-cloud-vs-rail", title: "Tool Cloud vs Transition Rail", cluster: "metaphor",
    description: "more tools vs one clear rail.", concept: "more tools ≠ clearer work",
    reuseTargets: ["sales comparison"], motionTechniques: ["jitter", "layout"], componentName: "WhatBeforeHowSplit", status: "ready" },
  { number: 8, id: "metro-map", title: "Metro Map of Work", cluster: "metaphor",
    description: "states are stations, transitions are lines.", concept: "navigation, not wandering",
    reuseTargets: ["workspace map", "process overview"], motionTechniques: ["pathLength", "node pulse"], componentName: "MetroMap", status: "ready" },
  { number: 9, id: "maze-vs-navigation", title: "Maze vs Navigation", cluster: "metaphor",
    description: "wandering vs a route.", concept: "state-first gives a route",
    reuseTargets: ["onboarding"], motionTechniques: ["path draw", "crossfade"], componentName: "MazeVsNavigation", status: "ready" },
  { number: 10, id: "refocusing-lens", title: "Refocusing Lens", cluster: "metaphor",
    description: "lens shifts focus from tools to states.", concept: "refocus on WHAT",
    reuseTargets: ["interactive education"], motionTechniques: ["pointer glow", "useTransform"], componentName: "RefocusingLens", status: "ready" },
  { number: 11, id: "task-differential", title: "Task Differential", cluster: "mechanics",
    description: "S₀ and S* as two panels with Δ between.", concept: "a task is a differential",
    reuseTargets: ["task definition screen"], motionTechniques: ["layout", "fadeUp"], componentName: "TaskDifferential", status: "ready" },
  { number: 12, id: "delta-decomposition", title: "Delta Decomposition Fractal", cluster: "mechanics",
    description: "S* → substates → transitions → events.", concept: "Δ factors into intermediate states",
    reuseTargets: ["planning view", "task breakdown"], motionTechniques: ["staggerChildren", "pathLength"], componentName: "DeltaDecomposition", status: "ready" },
  { number: 13, id: "monad-builder", title: "Monad Builder", cluster: "mechanics",
    description: "toggle prerequisites; watch sufficiency resolve.", concept: "the bottleneck is the monad",
    reuseTargets: ["preflight checker for agent runs"], motionTechniques: ["layout", "width tween", "verdict morph"], componentName: "MonadBuilder", status: "ready" },
  { number: 14, id: "missing-monad-detector", title: "Missing Monad Detector", cluster: "mechanics",
    description: "agent failed → context incomplete.", concept: "failure is usually an incomplete monad",
    reuseTargets: ["error UI", "failed run debugger"], motionTechniques: ["shake", "highlight"], componentName: "MissingMonadDetector", status: "ready" },
  { number: 15, id: "minimal-events-gate", title: "Minimal Events Gate", cluster: "mechanics",
    description: "gate opens only when required events arrive.", concept: "events cause transitions",
    reuseTargets: ["run preconditions", "automation recipes"], motionTechniques: ["gate open", "event particles"], componentName: "MinimalEventsGate", status: "ready" },
  { number: 16, id: "runtime-rooms", title: "Runtime Rooms", cluster: "mechanics",
    description: "docs/browser/repo/shell/db as runtime rooms.", concept: "runtime is the environment",
    reuseTargets: ["runtime picker", "ports panel"], motionTechniques: ["room activate", "crossfade"], componentName: "RuntimeRooms", status: "ready" },
  { number: 17, id: "quality-gates", title: "Quality Gates", cluster: "mechanics",
    description: "brief/evidence/draft/validated/shipped gates.", concept: "validators prove the state",
    reuseTargets: ["review workflow", "PR validation"], motionTechniques: ["gate sequence", "pathLength"], componentName: "QualityGates", status: "ready" },
  { number: 18, id: "execution-circuit-board", title: "Execution Circuit Board", cluster: "mechanics",
    description: "PCB schematic of S₀→S₁→S*.", concept: "a short, traced execution circuit",
    reuseTargets: ["technical architecture docs"], motionTechniques: ["signal travel", "node glow"], componentName: "CircuitBoard", status: "ready" },
  { number: 19, id: "trace-river", title: "Trace River", cluster: "metaphor",
    description: "experience as an observable trace.", concept: "the trace proves the transition",
    reuseTargets: ["logs / run history"], motionTechniques: ["flow", "useScroll"], componentName: "TraceRiver", status: "ready" },
  { number: 20, id: "trace-console", title: "Trace Console", cluster: "mechanics",
    description: "streaming event log grouped by transition.", concept: "observable trace",
    reuseTargets: ["agent run trace panel"], motionTechniques: ["AnimatePresence", "stream"], componentName: "TraceConsole", status: "ready" },

  // ── product ──
  { number: 21, id: "state-contracts", title: "State Contracts", cluster: "product",
    description: "vague request → transition contract cards.", concept: "a prompt is a transition contract",
    reuseTargets: ["new workspace creation flow"], motionTechniques: ["card morph", "layout"], componentName: "StateContracts", status: "ready" },
  { number: 22, id: "prompt-maturity-slider", title: "Prompt Maturity Slider", cluster: "product",
    description: "prompt → transition specification.", concept: "mature the prompt into a spec",
    reuseTargets: ["prompt editor", "task composer"], motionTechniques: ["useTransform", "drag"], componentName: "PromptMaturitySlider", status: "ready" },
  { number: 23, id: "intent-to-artifact", title: "Intent-to-Artifact Engine", cluster: "product",
    description: "raw intent through chambers to verified output.", concept: "intent crystallizes into an artifact",
    reuseTargets: ["landing hero", "product demo"], motionTechniques: ["LayoutGroup", "particle"], componentName: "IntentToArtifact", status: "ready" },
  { number: 24, id: "state-os-desktop", title: "State OS Desktop", cluster: "product",
    description: "inspector, planner, monad builder, runtime dock, trace console.", concept: "an operating system for work",
    reuseTargets: ["desktop shell concept", "dashboard"], motionTechniques: ["window choreography"], componentName: "StateOSDesktop", status: "ready" },
  { number: 25, id: "comparison-dashboard", title: "Comparison Dashboard", cluster: "product",
    description: "clarity, rework, trace, confidence metrics.", concept: "state clarity is measurable",
    reuseTargets: ["business landing", "analytics"], motionTechniques: ["number tween", "bar grow"], componentName: "ComparisonDashboard", status: "ready" },
  { number: 26, id: "speed-from-state-clarity", title: "Speed Comes from State Clarity", cluster: "product",
    description: "two timelines: fast start vs fast completion.", concept: "clarity, not haste, is speed",
    reuseTargets: ["explainer section"], motionTechniques: ["timeline draw"], componentName: "SpeedFromStateClarity", status: "ready" },
  { number: 27, id: "rework-spiral", title: "Rework Spiral vs Execution Circuit", cluster: "metaphor",
    description: "spiral of rework vs a short loop.", concept: "harness-first loops; state-first resolves",
    reuseTargets: ["marketing narrative"], motionTechniques: ["spiral path", "loop"], componentName: "ReworkSpiral", status: "ready" },
  { number: 28, id: "agent-is-vehicle", title: "Agent Is a Vehicle", cluster: "manifesto",
    description: "agent shrinks onto the transition edge.", concept: "agents execute; transitions own the work",
    reuseTargets: ["architecture docs", "onboarding"], motionTechniques: ["layout", "scale"], componentName: "AgentIsVehicle", status: "ready" },
  { number: 29, id: "harness-not-center", title: "Harness Is Not the Center", cluster: "manifesto",
    description: "WHAT / HOW / EVIDENCE layers.", concept: "harness is a HOW-layer subordinate to WHAT",
    reuseTargets: ["internal design principle"], motionTechniques: ["layer separation"], componentName: "HarnessNotCenter", status: "ready" },
  { number: 30, id: "agent-teams-to-graphs", title: "Agent Teams → Transition Graphs", cluster: "product",
    description: "multi-agent circle morphs into a state graph.", concept: "teams are transition graphs",
    reuseTargets: ["product education", "architecture"], motionTechniques: ["LayoutGroup morph"], componentName: "AgentTeamsToGraphs", status: "ready" },
  { number: 31, id: "work-microscope", title: "Work Microscope", cluster: "metaphor",
    description: "a task under the microscope: layers of state change.", concept: "work has internal structure",
    reuseTargets: ["task details", "explainability"], motionTechniques: ["zoom", "useTransform"], componentName: "WorkMicroscope", status: "ready" },
  { number: 32, id: "artifact-crystallization", title: "Artifact Crystallization", cluster: "metaphor",
    description: "raw intent particles → verified artifact.", concept: "the artifact is the proof",
    reuseTargets: ["landing visual", "demo"], motionTechniques: ["particle gather", "spring"], componentName: "ArtifactCrystallization", status: "ready" },
  { number: 33, id: "transition-choreography", title: "Transition Choreography", cluster: "metaphor",
    description: "states as points, events as movement beats.", concept: "transitions have rhythm",
    reuseTargets: ["artistic section"], motionTechniques: ["staggered beats"], componentName: "TransitionChoreography", status: "ready" },
  { number: 34, id: "onboarding-flow", title: "State-First Onboarding Flow", cluster: "product",
    description: "define S*, S₀, Δ, monad, trace.", concept: "onboarding teaches the model",
    reuseTargets: ["product onboarding"], motionTechniques: ["panel slide", "AnimatePresence"], componentName: "OnboardingFlow", status: "ready" },
  { number: 35, id: "text-streaming-grid", title: "Text Streaming Grid", cluster: "product",
    description: "streaming styles for chat/task composer.", concept: "assistant response modes",
    reuseTargets: ["chat UI"], motionTechniques: ["text reveal", "typewriter"], componentName: "TextStreamingGrid", status: "ready" },
  { number: 36, id: "transition-loaders", title: "Organic Transition Loaders", cluster: "library",
    description: "loaders: detecting, deriving, validating, tracing.", concept: "loading is a transition state",
    reuseTargets: ["loading states across app"], motionTechniques: ["pathLength loop", "spring"], componentName: "TransitionLoaders", status: "ready" },
  { number: 37, id: "shader-wallpapers", title: "Shader Mental-Model Wallpapers", cluster: "library",
    description: "subtle interactive backgrounds.", concept: "ambient state-first texture",
    reuseTargets: ["app backgrounds", "landing ambience"], motionTechniques: ["pointer glow", "useMotionTemplate"], componentName: "ShaderWallpapers", status: "ready" },
  { number: 38, id: "transition-construction-kit", title: "Transition Construction Kit", cluster: "library",
    description: "controls for completeness, validation, verbosity.", concept: "tune a transition",
    reuseTargets: ["internal playground"], motionTechniques: ["drag", "useTransform"], componentName: "ConstructionKit", status: "ready" },

  // ── superset ──
  { number: 39, id: "workspace-state-card", title: "Workspace State Card", cluster: "superset",
    description: "workspace = S₀/S*/transition/progress.", concept: "workspace is a state container",
    reuseTargets: ["workspace list cards"], motionTechniques: ["layout", "progress tween"], componentName: "WorkspaceStateCard", status: "ready" },
  { number: 40, id: "new-workspace-wizard", title: "New Workspace State Wizard", cluster: "superset",
    description: "user request → state contract → workspace.", concept: "create = derive a contract",
    reuseTargets: ["create workspace flow"], motionTechniques: ["step transitions", "AnimatePresence"], componentName: "NewWorkspaceWizard", status: "ready" },
  { number: 41, id: "agent-run-header", title: "Agent Run Header", cluster: "superset",
    description: "terminal topbar: transition, runtime, trace status.", concept: "the terminal shows the transition",
    reuseTargets: ["terminal header"], motionTechniques: ["status pulse"], componentName: "AgentRunHeader", status: "ready" },
  { number: 42, id: "agent-run-timeline", title: "Agent Run Timeline", cluster: "superset",
    description: "events mapped to transitions, not messages.", concept: "runs are transition timelines",
    reuseTargets: ["run detail page"], motionTechniques: ["timeline draw", "stagger"], componentName: "AgentRunTimeline", status: "ready" },
  { number: 43, id: "diff-as-state-proof", title: "Diff as State Proof", cluster: "superset",
    description: "diff annotated as what changed in state.", concept: "the diff is trace evidence",
    reuseTargets: ["review/diff panel"], motionTechniques: ["row reveal", "badge pop"], componentName: "DiffAsStateProof", status: "ready" },
  { number: 44, id: "issue-import-to-contour", title: "PR/Issue Import → Contour", cluster: "superset",
    description: "issue becomes S₀/S*/Δ contract.", concept: "imports become contracts",
    reuseTargets: ["integrations"], motionTechniques: ["card morph"], componentName: "IssueImportToContour", status: "ready" },
  { number: 45, id: "runtime-dock", title: "Runtime Dock for Ports/Tools", cluster: "superset",
    description: "browser, shell, repo, preview ports, db.", concept: "the dock maps the runtime",
    reuseTargets: ["ports/runtime panel"], motionTechniques: ["dock activate", "tool-call lifecycle"], componentName: "RuntimeDock", status: "ready" },
  { number: 46, id: "automation-recipe-graph", title: "Automation Recipe Graph", cluster: "superset",
    description: "automations as transition templates.", concept: "an automation is a transition template",
    reuseTargets: ["automations view"], motionTechniques: ["graph draw", "pathLength"], componentName: "AutomationRecipeGraph", status: "ready" },
  { number: 47, id: "command-palette", title: "Command Palette: Create Transition", cluster: "superset",
    description: "⌘K → create state contract.", concept: "commands create transitions",
    reuseTargets: ["command palette"], motionTechniques: ["AnimatePresence", "list stagger"], componentName: "CommandPalette", status: "ready" },
  { number: 48, id: "multi-workspace-map", title: "Multi-Workspace State Map", cluster: "superset",
    description: "all worktrees as a graph of states/transitions.", concept: "the fleet is a state graph",
    reuseTargets: ["global dashboard"], motionTechniques: ["force layout", "pathLength"], componentName: "MultiWorkspaceMap", status: "ready" },

  // ── library ──
  { number: 49, id: "component-playground", title: "Component Playground", cluster: "library",
    description: "all primitives with props, variants, font themes.", concept: "the design system, browsable",
    reuseTargets: ["dev/design system"], motionTechniques: ["hover", "copy affordance"], componentName: "ComponentPlayground", status: "ready" },
  { number: 50, id: "docs-embed-pack", title: "Docs/README Embed Pack", cluster: "library",
    description: "static-light versions of hero/formula/diagram.", concept: "the model, embeddable anywhere",
    reuseTargets: ["docs", "README", "changelog"], motionTechniques: ["reduced-motion static"], componentName: "DocsEmbedPack", status: "ready" },
];

export const SCENE_CLUSTERS: { id: SceneCluster; label: string }[] = [
  { id: "manifesto", label: "Manifesto" },
  { id: "mechanics", label: "Mechanics" },
  { id: "metaphor", label: "Metaphors" },
  { id: "product", label: "Product Surfaces" },
  { id: "superset", label: "Superset Integration" },
  { id: "library", label: "Component Library" },
];

/** Scenes whose components already exist in this kit. */
export const readyScenes = stateFirstScenes.filter((s) => s.status === "ready");

/** Group scenes by cluster, preserving order. */
export function scenesByCluster(cluster: SceneCluster) {
  return stateFirstScenes.filter((s) => s.cluster === cluster);
}
