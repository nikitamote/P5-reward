
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/users/${id}`, { name })
      .then(() => window.location.reload())
      .catch(error => console.error(error));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Save</button>
        <br />
        <Link to="/">Cancel</Link>    <br />
        <Link to={`/users/${id}/p5`}>P5 History</Link>     <br />
        <Link to={`/users/${id}/rewards`}>Rewards History</Link>    <br />
        <Link to={`/users/${id}/rewards/new`}>New Rewards</Link>    <br />
      </form>
    </div>
  );
};

export default ViewUser;
