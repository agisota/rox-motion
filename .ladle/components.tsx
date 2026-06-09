/** ROX UI — Ladle global provider: wraps every story in the kit's providers
 *  and loads the tokens so the catalog looks like production. */
import type { GlobalProvider } from "@ladle/react";
import "../src/tokens/tokens.css";
import { ColorThemeProvider } from "../src/providers/ColorThemeProvider";
import { MotionProvider } from "../src/providers/MotionProvider";
import { FontThemeProvider } from "../src/providers/FontThemeProvider";

export const Provider: GlobalProvider = ({ children }) => (
  <ColorThemeProvider>
    <MotionProvider>
      <FontThemeProvider>
        <div className="sf-blueprint-bg" style={{ background: "var(--sf-bg)", color: "var(--sf-ink)", minHeight: "100vh", padding: 32 }}>
          {children}
        </div>
      </FontThemeProvider>
    </MotionProvider>
  </ColorThemeProvider>
);
