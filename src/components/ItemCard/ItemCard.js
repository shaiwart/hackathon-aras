import React from 'react';
import PropTypes from 'prop-types';

const ItemCard = ({ title, fields }) => (
  <div className="card">
    <h2 className="card-title">{title}</h2>
    {fields.map((field, index) => (
      <div key={index} className="card-field">
        <strong>{field.label}:</strong> {field.value}
      </div>
    ))}
  </div>
);

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
