import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initLenis } from "./lib/lenis";

// Initialize Lenis for smooth scrolling
initLenis();

createRoot(document.getElementById("root")!).render(<App />);
