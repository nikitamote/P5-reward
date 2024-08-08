
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RewardHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}/rewards`)
      .then(response => setHistory(response.data))
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div>
      <h1>Reward History</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>Rewards Received</th>
            <th>Received From</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={entry._id}>
              <td>{index + 1}</td>
              <td>{new Date(entry.datetime).toLocaleString()}</td>
              <td>{entry.points}</td>
              <td>{entry.given_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardHistory;
