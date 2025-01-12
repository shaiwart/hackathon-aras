// Home.js
import React from "react";
import "./Home.css";
import ItemCard from "../../components/ItemCard/ItemCard";
import items from "../../data/items";
import itemData from "../../data/partItemData";

const Home = () => {


  return <div>
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
};

export default Home;