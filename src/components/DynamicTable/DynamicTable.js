import React from 'react';
import Table from 'react-bootstrap/Table';
// import partItemData from '../../data/partItemData'; // make sure to import your data correctly

function DynamicTable({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Item Number</th>
          <th>Keyed Name</th>
          <th>State</th>
          <th>Major Rev</th>
          <th>Make/Buy</th>
          <th>Created On</th>
          <th>Modified On</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.item_number}</td>
            <td>{item.keyed_name}</td>
            <td>{item.state}</td>
            <td>{item.major_rev}</td>
            <td>{item.make_buy}</td>
            <td>{item.created_on}</td>
            <td>{item.modified_on}</td>
            <td>{item.description || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DynamicTable;
