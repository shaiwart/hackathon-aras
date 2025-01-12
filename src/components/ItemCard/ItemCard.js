import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ title, fields }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {

    console.log("fields and data")
    console.log(fields)
    // Convert fields array to an object to pass as state
    const data = fields.reduce((acc, field) => {
      acc[field.label.replace(/\s+/g, "_").toLowerCase()] = field.value; // Convert labels to key names
      return acc;
    }, {});
    
    console.log(data)
    navigate("/itemview", { state: { data } });
  };


  return <div className="card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
    <h2 className="card-title">{title}</h2>
    {fields.map((field, index) => (
      <div key={index} className="card-field">
        <strong>{field.label}:</strong> {field.value}
      </div>
    ))}
  </div>
};


ItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ItemCard;
