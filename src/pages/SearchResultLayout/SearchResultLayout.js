// SearchResultLayout.js
import React, { useState } from "react";
import "./SearchResultLayout.css";
import SearchResultInCard from "../SearchResultInCard/SearchResultInCard";
import SearchResultInTable from "../SearchResultInTable/SearchResultInTable";
import gridIcon from "../../assets/icons/grid_icon.png";
import tableIcon from "../../assets/icons/table_icon_2.png";
import { useLocation } from "react-router-dom";


const SearchResultLayout = () => {
    const [view, setView] = useState("table");
    const location = useLocation();
    const partData = location.state?.partData || [];

    const handleViewChange = (selectedView) => {
        setView(selectedView);
    };

    return (
        <div className="search-result-layout">
            <div className="search-result-header">
                <div className="toggle-view">
                    {view === "table" && (
                        <div onClick={() => handleViewChange("card")}>
                            <img src={gridIcon} alt="Grid View" />
                        </div>
                    )}
                    {view === "card" && (
                        <div onClick={() => handleViewChange("table")}>
                            <img src={tableIcon} alt="Table View" />
                        </div>
                    )}
                </div>
            </div>
            <div>
                {view === "table" ? <SearchResultInTable data={partData} /> : <SearchResultInCard data={partData} />}
            </div>
        </div>
    );
};

export default SearchResultLayout;
