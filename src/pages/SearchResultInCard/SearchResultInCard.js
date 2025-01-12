import React from "react";
import ItemCard from "../../components/ItemCard/ItemCard";

const SearchResultInCard = ({ data }) => {
  const formatLabel = (fieldName) => {
    return fieldName
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letters
  };

  return (
    <div className="search-result">
      <div className="grid">
        {data.map((item, index) => {
          const cardTitle = `${item.item_number || item.id}`; // Use item_number if available, fallback to id
          
          // Dynamically get top 7 keys from the item object
          const cardFields = Object.entries(item)
            .slice(0, 7) // Take the first 7 key-value pairs
            .map(([key, value]) => ({
              label: formatLabel(key), // Format the key as a label
              value: value || "N/A", // Fallback to "N/A" if value is null or undefined
            }));

          return (
            <ItemCard
              key={index}
              title={cardTitle}
              fields={cardFields}
              data={item} // Pass the original data to ItemCard
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResultInCard;
