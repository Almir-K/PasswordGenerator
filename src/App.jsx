import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Country from "./components/Country";

import "./index.css";

// Create a new component for rendering the Filter
const FilterComponent = ({ onSearch, onRegionFilter }) => {
  const location = useLocation();
  const showFilter = location.pathname === "/";

  return showFilter ? (
    <Filter onSearch={onSearch} onRegionFilter={onRegionFilter} />
  ) : null;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <FilterComponent
                onSearch={handleSearch}
                onRegionFilter={handleRegionFilter}
              />
              <Countries searchTerm={searchTerm} selectedRegion={selectedRegion} />
            </div>
          }
        />
        <Route path="/countries/:countryName" element={<Country />} />
      </Routes>
    </Router>
  );
}

export default App;
