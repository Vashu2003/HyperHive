import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";  // Import the ThemeProvider

function App() {
  return (
    <ThemeProvider>  {/* Wrap the app with ThemeProvider */}
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
    <Router>
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add more routes as necessary */}
          </Routes>
        </div>
      </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
