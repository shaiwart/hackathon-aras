import React from "react";
import "./Itemview.css";
import { useLocation } from "react-router-dom";
import ChatComponent from "../ItemCommentSection/ItemCommentSection"

const Itemview = () => {
  const location = useLocation();
  const { data } = location.state || {}; // Retrieve data passed via state

  // Function to convert field names to readable labels
  const formatLabel = (fieldName) => {
    return fieldName
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/@.*$/, "") // Remove anything after '@' if it exists
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letters
  };

  if (!data || typeof data !== "object") {
    return <div>No valid data available</div>;
  }

  return (
    <div className="itemview-container">
      <div className="itemview-header">Heading Section</div>
      <div className="itemview-content">
        <div className="itemview-content-left">
          <form>
            <div className="grid-container">
              {/* Dynamically generate grid items */}
              {Object.entries(data).map(([key, value]) => (
                <div
                  className={`grid-item ${
                    key === "description" ? "grid-item-large" : ""
                  }`}
                  key={key}
                >
                  <label htmlFor={key}>{formatLabel(key)}</label>
                  {/* Use textarea for large fields like description */}
                  {key === "description" ? (
                    <textarea
                      id={key}
                      value={value || ""} // Fallback to empty string if value is undefined or null
                      readOnly
                    />
                  ) : (
                    <input
                      type="text"
                      id={key}
                      value={value || ""} // Fallback to empty string if value is undefined or null
                      readOnly
                    />
                  )}
                </div>
              ))}
            </div>
          </form>
        </div>
        <div className="itemview-content-right">
          <div className="social">
            <span>Social</span>
          </div>
          <div>
            <ChatComponent sg_item_id={data.id}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itemview;
