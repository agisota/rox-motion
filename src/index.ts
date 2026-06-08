/**
 * STATE-FIRST KIT — Public API
 *
 *   import { WorkspaceStateCard, MonadBuilder, sfColors } from "rox-ui";
 *   import "rox-ui/tokens.css";   // tokens + component styles
 */

// ── Tokens ──
export {
  sfColors, sfGlows, sfRadius, sfEase, sfSpring, sfColorMeaning,
} from "./tokens/tokens";
export type { SfColorKey, SfFontTheme } from "./tokens/tokens";
export * from "./tokens/motion-variants";

// ── Providers ──
export { FontThemeProvider, useFontTheme } from "./providers/FontThemeProvider";
export {
  MotionProvider, useMotionLevel, useLoopsAllowed, useAnyMotion,
} from "./providers/MotionProvider";
export type { MotionLevel } from "./providers/MotionProvider";

// ── Hooks ──
export { usePointerGlow } from "./hooks/usePointerGlow";

// ── Primitives ──
export { StateCard } from "./primitives/StateCard";
export type { StateKind } from "./primitives/StateCard";
export { TransitionRail } from "./primitives/TransitionRail";
export { MonadCapsule } from "./primitives/MonadCapsule";
export { RunButton } from "./primitives/RunButton";
export type { RunPhase } from "./primitives/RunButton";
export { FontThemeSwitch } from "./primitives/FontThemeSwitch";
export { MotionControl } from "./primitives/MotionControl";
export { WorkspaceStateCard } from "./primitives/WorkspaceStateCard";
export { TraceConsole, DEMO_TRACE } from "./primitives/TraceConsole";
export type { TraceEntry, TraceEntryKind } from "./primitives/TraceConsole";
export { AgentRunHeader } from "./primitives/AgentRunHeader";

// ── Scenes (composites) — all 44 scene components ──
// manifesto / mechanics / metaphor
export { WhatBeforeHowSplit } from "./scenes/WhatBeforeHowSplit";
export { CoreFormula } from "./scenes/CoreFormula";
export { DeltaDecomposition } from "./scenes/DeltaDecomposition";
export { StateAtomGrid } from "./scenes/StateAtomGrid";
export { GravityField } from "./scenes/GravityField";
export { MetroMap } from "./scenes/MetroMap";
export { MazeVsNavigation } from "./scenes/MazeVsNavigation";
export { RefocusingLens } from "./scenes/RefocusingLens";
export { TaskDifferential } from "./scenes/TaskDifferential";
export { MonadBuilder } from "./scenes/MonadBuilder";
export { MissingMonadDetector } from "./scenes/MissingMonadDetector";
export { MinimalEventsGate } from "./scenes/MinimalEventsGate";
export { RuntimeRooms } from "./scenes/RuntimeRooms";
export { QualityGates } from "./scenes/QualityGates";
export { CircuitBoard } from "./scenes/CircuitBoard";
export { TraceRiver } from "./scenes/TraceRiver";
// product
export { StateContracts } from "./scenes/StateContracts";
export { PromptMaturitySlider } from "./scenes/PromptMaturitySlider";
export { IntentToArtifact } from "./scenes/IntentToArtifact";
export { StateOSDesktop } from "./scenes/StateOSDesktop";
export { ComparisonDashboard } from "./scenes/ComparisonDashboard";
export { SpeedFromStateClarity } from "./scenes/SpeedFromStateClarity";
export { ReworkSpiral } from "./scenes/ReworkSpiral";
export { AgentIsVehicle } from "./scenes/AgentIsVehicle";
export { HarnessNotCenter } from "./scenes/HarnessNotCenter";
export { AgentTeamsToGraphs } from "./scenes/AgentTeamsToGraphs";
export { WorkMicroscope } from "./scenes/WorkMicroscope";
export { ArtifactCrystallization } from "./scenes/ArtifactCrystallization";
export { TransitionChoreography } from "./scenes/TransitionChoreography";
export { OnboardingFlow } from "./scenes/OnboardingFlow";
// library
export { TextStreamingGrid } from "./scenes/TextStreamingGrid";
export { TransitionLoaders } from "./scenes/TransitionLoaders";
export { ShaderWallpapers } from "./scenes/ShaderWallpapers";
export { ConstructionKit } from "./scenes/ConstructionKit";
export { ComponentPlayground } from "./scenes/ComponentPlayground";
export { DocsEmbedPack } from "./scenes/DocsEmbedPack";
// superset surfaces
export { NewWorkspaceWizard } from "./scenes/NewWorkspaceWizard";
export { AgentRunTimeline } from "./scenes/AgentRunTimeline";
export { DiffAsStateProof } from "./scenes/DiffAsStateProof";
export { IssueImportToContour } from "./scenes/IssueImportToContour";
export { RuntimeDock } from "./scenes/RuntimeDock";
export { AutomationRecipeGraph } from "./scenes/AutomationRecipeGraph";
export { CommandPalette } from "./scenes/CommandPalette";
export { MultiWorkspaceMap } from "./scenes/MultiWorkspaceMap";

// ── Full assembled page (drop-in) ──
export { StateFirstPage } from "./StateFirstPage";
export { sceneRegistry } from "./scene-registry";

// ── Data ──
export {
  stateFirstScenes, readyScenes, scenesByCluster, SCENE_CLUSTERS,
} from "./data/scenes";
export type { StateFirstScene, SceneCluster, SceneStatus } from "./data/scenes";
export {
  stateFirstExamples, DEFAULT_EXAMPLE, ontologyAtoms,
} from "./data/demo-data";
export type { StateFirstExample, MonadSpec } from "./data/demo-data";
