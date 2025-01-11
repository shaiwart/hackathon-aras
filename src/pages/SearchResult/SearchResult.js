// SearchResult.js
import React from "react"
// import profileImg from '../../images/profile.jpg'
import ItemCard from "../../components/ItemCard/ItemCard"
import itemData from "../../data/partItemData"


const SearchResult = () => {
    return <div class="search-result">
        <div className="grid">
            {itemData.map((item, index) => {
                const cardTitle = `${item.item_number}`;
                const cardFields = [
                    { label: 'Keyed Name', value: item.keyed_name },
                    { label: 'Description', value: item.description || 'N/A' },
                    { label: 'Created On', value: item.created_on },
                    { label: 'Modified On', value: item.modified_on },
                    { label: 'State', value: item.state },
                    { label: 'Make/Buy', value: item.make_buy },
                    { label: 'Major Revision', value: item.major_rev },
                    { label: 'Unit', value: item.unit },
                ];

                return <ItemCard key={index} title={cardTitle} fields={cardFields} />;
            })}
        </div>
    </div>
};

export default SearchResult;