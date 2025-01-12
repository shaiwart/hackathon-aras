import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './Dashboard.css'; // Import a CSS file for styling

const API_URL = process.env.REACT_APP_API_URL_FOR_COMMENT_SECTION;
const API_KEY = process.env.REACT_APP_API_KEY;
const ITEM_DETAILS_URL = 'http://localhost/InnovatorServer33/Server/ws/docshare/v1/Part';

const Dashboard = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_URL}?$expand=created_by_id`, {
          method: "GET",
          headers: {
            Authorization: `apikey ${API_KEY}`,
          },
        });
        const data = await response.json();
        const filteredComments = data.value
          .filter((comment) => comment.created_by_id.id === '30B991F927274FA3829655F50C99472E')
          .sort((a, b) => new Date(a.created_on) - new Date(b.created_on));
        setComments(filteredComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const handleRowClick = async (id) => {
    try {
      const response = await fetch(`${ITEM_DETAILS_URL}('${id}')`, {
        method: "GET",
        headers: {
          Authorization: `apikey ${API_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching item data: ${response.status}`);
      }
      const itemData = await response.json();
      navigate('/itemview', { state: { data: itemData } });
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h3 className="dashboard-header">Welcome to the Dashboard</h3>
      <div className="dashboard-grid">
        <div className="grid-item item1">Overview</div>
        <div className="grid-item item2">
          <h4>Social</h4>
          <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Comment Text</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id} onClick={() => handleRowClick(comment.sg_item_id)}>
                    <td>{comment.sg_item_id}</td>
                    <td>{comment.sg_comment_text}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="grid-item item3">Recent Activities</div>
        <div className="grid-item item4">Settings</div>
        <div className="grid-item item5">Notifications</div>
        <div className="grid-item item6">Statistics</div>
      </div>
    </div>
  );
};

export default Dashboard;
