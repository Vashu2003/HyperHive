import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { GroupProvider } from "./context/GroupContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GroupProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </GroupProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
