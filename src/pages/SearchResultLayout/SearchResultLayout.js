// SearchResultLayout.js
import React, { useState } from "react";
import SearchResultInCard from "../SearchResultInCard/SearchResultInCard";
import DynamicTable from "../../components/DynamicTable/DynamicTable";
import "./SearchResultLayout.css";
import gridIcon from "../../assets/icons/grid_icon.png";
import tableIcon from "../../assets/icons/table_icon_2.png";

const SearchResultLayout = () => {
    const [view, setView] = useState("table");

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
                {view === "table" ? <DynamicTable /> : <SearchResultInCard />}
            </div>
        </div>
    );
};

export default SearchResultLayout;
