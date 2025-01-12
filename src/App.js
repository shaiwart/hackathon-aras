// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import SearchResultInCard from "./pages/SearchResultInCard/SearchResultInCard";
import SearchResultLayout from "./pages/SearchResultLayout/SearchResultLayout";
import DynamicTable from "./components/DynamicTable/DynamicTable";
import Login from "./pages/login/Login";

import "./App.css";
// import "./App_copy.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<SearchResultLayout />} />
          <Route path="table-view" element={<DynamicTable />} />
          {/* <Route index element={<SearchResultInCard />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;