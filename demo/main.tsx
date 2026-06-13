import { createRoot } from "react-dom/client";
import "@fontsource/victor-mono/400.css";
import "@fontsource/victor-mono/500.css";
import "@fontsource/victor-mono/600.css";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/lekton/400.css";
import "@fontsource/lekton/700.css";
import "../src/tokens/tokens.css";
import { StateFirstPage } from "../src/index";

const el = document.getElementById("root");
if (el) createRoot(el).render(<StateFirstPage />);
