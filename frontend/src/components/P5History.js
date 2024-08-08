
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const P5History = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}/p5`)
      .then(response => {
        console.log(response.data);
        setHistory(response.data)
      })
      
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = (transactionId) => {
    axios.delete(`http://localhost:5000/p5-transactions/${transactionId}`)
      .then(() => window.location.reload())
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>P5 History</h1>
      <Link to={`/users/${id}/rewards/new`}>Create New Reward</Link>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>P5 Given</th>
            <th>P5 Given to</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={entry._id}>
              <td>{index + 1}</td>
              <td>{new Date(entry.datetime).toLocaleString()}</td>
              <td>{entry.points}</td>
              <td>{entry.given_to}</td>
              <td><button onClick={() => handleDelete(entry._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default P5History;
