import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

function SearchResultInTable({ data }) {
  const navigate = useNavigate();

  // Extract the top 7 keys from the first item to create the headers
  const getTopKeys = (dataItem) => Object.keys(dataItem).slice(0, 7);

  // Safely handle cases where data might be empty
  const topKeys = data.length > 0 ? getTopKeys(data[0]) : [];

  const formatLabel = (fieldName) => {
    return fieldName
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letters
  };

  const handleRowClick = (rowData) => {
    navigate("/itemview", { state: { data: rowData } });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {topKeys.map((key) => (
            <th key={key}>{formatLabel(key)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} onClick={() => handleRowClick(item)} style={{ cursor: "pointer" }}>
            <td>{index + 1}</td>
            {topKeys.map((key) => (
              <td key={key}>{item[key] || "N/A"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SearchResultInTable;
