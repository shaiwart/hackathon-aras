// SearchResultLayout.js
import React from "react"
import SearchResult from "../SearchResult/SearchResult"
import "./SearchResultLayout.css"


const SearchResultLayout = () => {
    return <div class="search-result-layout">
        <div className="search-result-layout">
            search result header
        </div>
        <div>
            <SearchResult />
        </div>
    </div>
};

export default SearchResultLayout;