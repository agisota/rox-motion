// ROX UI — visual-regression + a11y smoke (#19).
// Point ROX_PREVIEW_URL at a running Ladle/Next preview of <StateFirstPage/>.
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const FONTS = ["victor", "bebas", "lekton"] as const;
const THEMES = ["dark", "light", "hc"] as const;

test.describe("StateFirstPage", () => {
  test("no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto("/");
    await expect(page.getByText("we design the state.")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });

  for (const theme of THEMES) {
    for (const font of FONTS) {
      test(`hero snapshot — ${theme}/${font}`, async ({ page }) => {
        await page.goto("/");
        await page.evaluate(([t, f]) => {
          document.documentElement.setAttribute("data-sf-theme", t);
          document.documentElement.setAttribute("data-sf-font", f);
        }, [theme, font]);
        await expect(page.locator("header.sf-hero")).toHaveScreenshot(`hero-${theme}-${font}.png`);
      });
    }
  }

  test("axe: no serious/critical violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious).toEqual([]);
  });
});
