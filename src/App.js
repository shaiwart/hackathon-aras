// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/SearchResult/SearchResult";
import SearchResultLayout from "./pages/SearchResultLayout/SearchResultLayout";

import "./App.css";
// import "./App_copy.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<SearchResultLayout />} />
          {/* <Route index element={<SearchResult />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;