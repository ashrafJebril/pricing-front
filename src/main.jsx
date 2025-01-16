import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css"; // Core CSS

createRoot(document.getElementById("root")).render(<App />);
