// ROX UI — Playwright visual-regression config (#19).
// Run: bun add -d @playwright/test @axe-core/playwright && bunx playwright install --with-deps && bun run test:visual
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  snapshotDir: "./e2e/__snapshots__",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: process.env.ROX_PREVIEW_URL ?? "http://localhost:6006",
    colorScheme: "dark",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
