import { describe, it, expect } from "vitest";
import { stateFirstScenes, SCENE_CLUSTERS, scenesByCluster, readyScenes } from "../data/scenes";

const VALID_CLUSTERS = SCENE_CLUSTERS.map((c) => c.id);

describe("scene registry", () => {
  it("contains exactly 50 scenes", () => {
    expect(stateFirstScenes).toHaveLength(50);
  });

  it("numbers scenes 1..50 with no gaps or dupes", () => {
    const numbers = stateFirstScenes.map((s) => s.number).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
  });

  it("has unique anchor ids", () => {
    const ids = new Set(stateFirstScenes.map((s) => s.id));
    expect(ids.size).toBe(50);
  });

  it("every scene has the required fields populated", () => {
    for (const s of stateFirstScenes) {
      expect(s.id).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.componentName).toBeTruthy();
      expect(s.concept).toBeTruthy();
      expect(VALID_CLUSTERS).toContain(s.cluster);
      expect(s.reuseTargets.length).toBeGreaterThan(0);
      expect(s.motionTechniques.length).toBeGreaterThan(0);
      expect(["ready", "todo"]).toContain(s.status);
    }
  });

  it("groups every scene under a known cluster", () => {
    const grouped = VALID_CLUSTERS.flatMap((c) => scenesByCluster(c));
    expect(grouped).toHaveLength(50);
  });

  it("exposes the implemented scenes via readyScenes", () => {
    expect(readyScenes.length).toBeGreaterThanOrEqual(6);
    expect(readyScenes.every((s) => s.status === "ready")).toBe(true);
  });
});
