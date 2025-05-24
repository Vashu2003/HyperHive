import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home"; // Dashboard
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const location = useLocation();

  // Define routes where you DON'T want to show the Navbar
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="max-h-[90vh] bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Conditionally render Navbar */}
      {!shouldHideNavbar && <Navbar />}

      <div className="container mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/groups/:groupId"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;