import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import Waves from "./components/Waves";

function App() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Tasks");

  // Define routes where you don't want Navbar
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark overflow-hidden text-text-light dark:text-text-dark">
      
      {/* 🌊 Waves Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Light mode waves */}
        <div className="block dark:hidden w-full h-full">
          <Waves
            lineColor="#00000022"
            backgroundColor="transparent"
            className="w-full h-full"
          />
        </div>

        {/* Dark mode waves */}
        <div className="hidden dark:block w-full h-full">
          <Waves
            lineColor="#ffffff22"
            backgroundColor="transparent"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* 🌫️ Backdrop layer to blur content over waves */}
      <div className="fixed inset-0 z-10 backdrop-blur-sm" />

      {/* 🧭 Navbar (conditionally hidden) */}
      {!shouldHideNavbar && (
        <div className="relative z-20">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      )}

      {/* 📦 Main content */}
      <div className="relative z-20 container mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home activeTab={activeTab} setActiveTab={setActiveTab} />
              </PrivateRoute>
            }
          />
          <Route
            path="/groups/:groupId"
            element={
              <PrivateRoute>
                <Home activeTab={activeTab} setActiveTab={setActiveTab} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
