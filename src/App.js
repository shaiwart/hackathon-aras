// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Define routes for main content */}
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;