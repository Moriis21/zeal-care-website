import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n/index";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
