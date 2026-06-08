/**
 * STATE-FIRST KIT — scene component registry
 *
 * Maps every `componentName` from data/scenes.ts to a real, renderable
 * component. Primitives that double as scenes (TraceConsole, WorkspaceStateCard,
 * AgentRunHeader) are wrapped with demo props so they render standalone.
 *
 * `HeroSection` is intentionally NOT here — the page renders the hero itself.
 */

import type { ComponentType } from "react";

import { WhatBeforeHowSplit } from "./scenes/WhatBeforeHowSplit";
import { CoreFormula } from "./scenes/CoreFormula";
import { DeltaDecomposition } from "./scenes/DeltaDecomposition";
import { StateAtomGrid } from "./scenes/StateAtomGrid";
import { GravityField } from "./scenes/GravityField";
import { MetroMap } from "./scenes/MetroMap";
import { MazeVsNavigation } from "./scenes/MazeVsNavigation";
import { RefocusingLens } from "./scenes/RefocusingLens";
import { TaskDifferential } from "./scenes/TaskDifferential";
import { MonadBuilder } from "./scenes/MonadBuilder";
import { MissingMonadDetector } from "./scenes/MissingMonadDetector";
import { MinimalEventsGate } from "./scenes/MinimalEventsGate";
import { RuntimeRooms } from "./scenes/RuntimeRooms";
import { QualityGates } from "./scenes/QualityGates";
import { CircuitBoard } from "./scenes/CircuitBoard";
import { TraceRiver } from "./scenes/TraceRiver";
import { StateContracts } from "./scenes/StateContracts";
import { PromptMaturitySlider } from "./scenes/PromptMaturitySlider";
import { IntentToArtifact } from "./scenes/IntentToArtifact";
import { StateOSDesktop } from "./scenes/StateOSDesktop";
import { ComparisonDashboard } from "./scenes/ComparisonDashboard";
import { SpeedFromStateClarity } from "./scenes/SpeedFromStateClarity";
import { ReworkSpiral } from "./scenes/ReworkSpiral";
import { AgentIsVehicle } from "./scenes/AgentIsVehicle";
import { HarnessNotCenter } from "./scenes/HarnessNotCenter";
import { AgentTeamsToGraphs } from "./scenes/AgentTeamsToGraphs";
import { WorkMicroscope } from "./scenes/WorkMicroscope";
import { ArtifactCrystallization } from "./scenes/ArtifactCrystallization";
import { TransitionChoreography } from "./scenes/TransitionChoreography";
import { OnboardingFlow } from "./scenes/OnboardingFlow";
import { TextStreamingGrid } from "./scenes/TextStreamingGrid";
import { TransitionLoaders } from "./scenes/TransitionLoaders";
import { ShaderWallpapers } from "./scenes/ShaderWallpapers";
import { ConstructionKit } from "./scenes/ConstructionKit";
import { ComponentPlayground } from "./scenes/ComponentPlayground";
import { DocsEmbedPack } from "./scenes/DocsEmbedPack";
import { NewWorkspaceWizard } from "./scenes/NewWorkspaceWizard";
import { AgentRunTimeline } from "./scenes/AgentRunTimeline";
import { DiffAsStateProof } from "./scenes/DiffAsStateProof";
import { IssueImportToContour } from "./scenes/IssueImportToContour";
import { RuntimeDock } from "./scenes/RuntimeDock";
import { AutomationRecipeGraph } from "./scenes/AutomationRecipeGraph";
import { CommandPalette } from "./scenes/CommandPalette";
import { MultiWorkspaceMap } from "./scenes/MultiWorkspaceMap";

import { TraceConsole, DEMO_TRACE } from "./primitives/TraceConsole";
import { WorkspaceStateCard } from "./primitives/WorkspaceStateCard";
import { AgentRunHeader } from "./primitives/AgentRunHeader";

// primitive-as-scene adapters (demo props so they render standalone)
function TraceConsoleScene() {
  return (
    <div className="sf-card">
      <div className="sf-card__bar">
        <span className="sf-lamp" style={{ background: "var(--sf-target)" }} />
        trace console · grouped by transition
      </div>
      <div className="sf-card__body">
        <TraceConsole entries={DEMO_TRACE} />
      </div>
    </div>
  );
}

function WorkspaceStateCardScene() {
  return (
    <WorkspaceStateCard
      workspace={{ branch: "feat/auth-fix", worktree: "wt-01" }}
      currentState="bug reproduced"
      targetState="tests passing"
      activeTransition="patch implementation"
      traceStatus="recording"
      validatorStatus="pending"
      progress={62}
    />
  );
}

function AgentRunHeaderScene() {
  return (
    <div>
      <AgentRunHeader
        transition="T2 · implement fix"
        runtime={["repo", "shell"]}
        monadSufficiency={{ complete: 8, total: 10 }}
        traceStatus="recording"
        validatorStatus="not run"
      />
      <div className="sf-runterm" style={{ borderTop: 0 }}>
        <div>
          <span className="sf-p">agent@wt-01</span> <span className="sf-c">› applying patch to src/auth/session.ts</span>
        </div>
        <div>
          <span className="sf-p">agent@wt-01</span> <span className="sf-c">› running tests… 142 passed</span>
        </div>
      </div>
    </div>
  );
}

export const sceneRegistry: Record<string, ComponentType> = {
  WhatBeforeHowSplit,
  CoreFormula,
  DeltaDecomposition,
  StateAtomGrid,
  GravityField,
  MetroMap,
  MazeVsNavigation,
  RefocusingLens,
  TaskDifferential,
  MonadBuilder,
  MissingMonadDetector,
  MinimalEventsGate,
  RuntimeRooms,
  QualityGates,
  CircuitBoard,
  TraceRiver,
  StateContracts,
  PromptMaturitySlider,
  IntentToArtifact,
  StateOSDesktop,
  ComparisonDashboard,
  SpeedFromStateClarity,
  ReworkSpiral,
  AgentIsVehicle,
  HarnessNotCenter,
  AgentTeamsToGraphs,
  WorkMicroscope,
  ArtifactCrystallization,
  TransitionChoreography,
  OnboardingFlow,
  TextStreamingGrid,
  TransitionLoaders,
  ShaderWallpapers,
  ConstructionKit,
  ComponentPlayground,
  DocsEmbedPack,
  NewWorkspaceWizard,
  AgentRunTimeline,
  DiffAsStateProof,
  IssueImportToContour,
  RuntimeDock,
  AutomationRecipeGraph,
  CommandPalette,
  MultiWorkspaceMap,
  // primitives presented as scenes
  TraceConsole: TraceConsoleScene,
  WorkspaceStateCard: WorkspaceStateCardScene,
  AgentRunHeader: AgentRunHeaderScene,
};
