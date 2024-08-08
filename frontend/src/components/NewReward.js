
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NewReward = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [points, setPoints] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));

    axios.get(`http://localhost:5000/users/${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/users/${id}/rewards`, { recipientId: recipient, points })
      .then(() => navigate(`/users/${id}/p5`))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>New Reward</h1>
      <form onSubmit={handleSubmit}>
        <label>Recipient:</label>
        <select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        >
          <option value="">Select a user</option>
          {users.filter(user => user._id !== id).map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <label>Points:</label>
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          min="1"
          max="100"
          required
        />
        <button type="submit" disabled={points > 100 || points > (user ? user.p5_balance : 0)}>Submit</button>
        <button type="button" onClick={() => navigate(`/users/${id}/p5`)}>Cancel</button>
      </form>
      {user && <div>P5 Balance: {user.p5_balance}</div>}
    </div>
  );
};

export default NewReward;
