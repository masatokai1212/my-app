import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import MansionForm from './components/MansionForm';
import HouseForm from './components/HouseForm';
import LandForm from './components/LandForm';

function App() {
  return (
    <Router>
      <div>
        <ConditionalNav />
        <Routes>
          <Route path="/mansion" element={<MansionForm />} />
          <Route path="/house" element={<HouseForm />} />
          <Route path="/land" element={<LandForm />} />
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalNav() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return isHome ? (
    <nav>
      <ul>
        <li>
          <Link to="/mansion">マンションフォーム</Link>
        </li>
        <li>
          <Link to="/house">戸建てフォーム</Link>
        </li>
        <li>
          <Link to="/land">土地フォーム</Link>
        </li>
      </ul>
    </nav>
  ) : null;
}

export default App;
