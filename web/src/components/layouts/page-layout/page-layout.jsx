import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackGround from "../../backGround/BackGround";
import logo from '/images/descarga.svg';

function PageLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="fixed-top custom-header-bg text-white p-0 m-0">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Columna izquierda: Home */}
            <div className="col-4">
              <nav>
                <ul className="nav">
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link text-white"
                      onClick={() => navigate('/')}
                    >
                      Home
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            {/* Columna central: Logo */}
            <div className="col-4 text-center">
              <div
                className="logo-containerh"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/')}
              >
                <img
                  src={logo}
                  alt="Logo Animado"
                  className="animated-logo"
                />
              </div>
            </div>
            {/* Columna derecha: Search y Profile */}
            <div className="col-4 text-end">
              <nav>
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link text-white"
                      onClick={() => navigate('/searchUsers')}
                    >
                      Search
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link text-white"
                      onClick={() => navigate('/user/me')}
                    >
                      Profile
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-fill position-relative m-0 py-2 px-0" style={{ overflowX: 'hidden' }}>
        <BackGround />
        <div className="container-fluid px-5 mx-1">
          {children}
        </div>
      </main>
      <footer className="fixed-bottom custom-header-bg text-white text-center py-3">
        <small>&copy; 2025 Pokemon API. Todos los derechos reservados. IronGuardians</small>
      </footer>
    </div>
  );
}

export default PageLayout;