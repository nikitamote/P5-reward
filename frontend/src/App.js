import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './components/UsersList';
import NewUser from './components/NewUser';
import ViewUser from './components/ViewUser';
import P5History from './components/P5History';
import RewardHistory from './components/RewardHistory';
import NewReward from './components/NewReward';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/new" element={<NewUser />} />
        <Route path="/users/:id" element={<ViewUser />} />
        <Route path="/users/:id/p5" element={<P5History />} />
        <Route path="/users/:id/rewards" element={<RewardHistory />} />
        <Route path="/users/:id/rewards/new" element={<NewReward />} />
      </Routes>
    </Router>
  );
}

export default App;
