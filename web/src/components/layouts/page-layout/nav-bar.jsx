import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '/images/descarga.svg';
import * as IronPokeApi from "../../../services/api-service";
import './nav-bar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleCloseSession = async () => {
    try {
      await IronPokeApi.closeSession();
      navigate("/login");
    } catch (error) {
      console.error("Error closing session:", error);
    }
  };

  return (
    <header className="fixed-top custom-header-bg text-white p-0 m-0">
      <nav className="navbar navbar-expand-lg navbar-dark custom-header-bg px-3">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <img 
            onClick={() => navigate('/')} 
            src={logo} 
            alt="Pokemon API" 
            className="animated-logo" 
            style={{ height: '50px', cursor: 'pointer' }}
          />
          <button 
            className="navbar-toggler custom-toggler" // Custom class for smaller burger icon
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarNav">
            <ul className="navbar-nav ms-auto justify-content-end gap-3">
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-white d-flex align-items-center gap-1"
                  onClick={() => navigate('/searchUsers')}
                >
                  <FontAwesomeIcon icon={faSearch} /> Search User
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-white d-flex align-items-center gap-1"
                  onClick={() => navigate('/profile/me')}
                >
                  <FontAwesomeIcon icon={faUser} /> My Profile
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-white d-flex align-items-center gap-1"
                  onClick={handleCloseSession}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Close
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
