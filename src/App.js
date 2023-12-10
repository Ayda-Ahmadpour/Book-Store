import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import BooksCollection from './components/BooksCollection';
import './App.css';
import './customStyle.css';

function App() {
  return (
    <Router>
      <div className="appContainer">

        <nav>
          <ul className="navbar">
            <li className="logo">Book Store</li>
            <li>
              <Link to="/" className="navbarlink">
                BOOKS
              </Link>
            </li>
          </ul>
        </nav>
        <div className="user">
          <FaUserAlt className="profile" />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<BooksCollection />} />
      </Routes>
    </Router>
  );
}

export default App;
