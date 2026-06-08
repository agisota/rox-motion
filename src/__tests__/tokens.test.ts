import { describe, it, expect } from "vitest";
import { sfColors, sfColorMeaning, sfSpring, sfEase } from "../tokens/tokens";
import { stateFirstExamples, ontologyAtoms } from "../data/demo-data";

describe("tokens", () => {
  it("exports all semantic colors as hex", () => {
    for (const value of Object.values(sfColors)) {
      expect(value).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("documents the meaning of every color", () => {
    expect(Object.keys(sfColorMeaning).sort()).toEqual(Object.keys(sfColors).sort());
  });

  it("keeps the semantic law: target is green, transition is orange", () => {
    expect(sfColors.target).toBe("#7DFF9E");
    expect(sfColors.transition).toBe("#FF7A2B");
  });

  it("ships a spring config for MotionConfig", () => {
    expect(sfSpring.type).toBe("spring");
    expect(sfEase).toHaveLength(4);
  });
});

describe("demo data", () => {
  it("provides nine ontology atoms", () => {
    expect(ontologyAtoms).toHaveLength(9);
  });

  it("every example is a complete S₀→S* transition", () => {
    for (const ex of stateFirstExamples) {
      expect(ex.s0).toBeTruthy();
      expect(ex.star).toBeTruthy();
      expect(ex.transitions.length).toBeGreaterThan(0);
      expect(ex.events.length).toBeGreaterThan(0);
      expect(ex.runtime.length).toBeGreaterThan(0);
      expect(ex.trace.length).toBeGreaterThan(0);
      expect(ex.validator.length).toBeGreaterThan(0);
      expect(ex.artifact).toBeTruthy();
    }
  });
});
