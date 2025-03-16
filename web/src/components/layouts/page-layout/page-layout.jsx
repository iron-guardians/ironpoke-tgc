import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackGround from "../../backGround/BackGround";
import logo from '/images/descarga.svg';
import * as IronPokeApi from "../../../services/api-service";




function PageLayout({ children, variant }) {
  const navigate = useNavigate();

  const handleCloseSession = async () => {
   
    try {
      await IronPokeApi.closeSession();

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        Object.keys(error.response.data.errors).forEach((inputName) =>
          setError(inputName, { message: error.response.data.errors[inputName] })
        );
      } else {
        console.error("Error closing session:", error);
      }
  };
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="fixed-top custom-header-bg text-white p-0 m-0">
        <nav className="navbar navbar-expand-lg navbar-dark custom-header-bg">
          <div className="container-fluid">
            <div className="d-flex justify-content-center w-100">
              <img onClick={() => navigate('/')} src={logo} alt="Pokemon API" className="animated-logo" />
            </div>
            <button 
              className="navbar-toggler" 
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
              <ul className="navbar-nav ms-auto justify-content-end">
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => navigate('/searchUsers')}
                  >
                    SearchUser
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => navigate('/profile/me')}
                  >
                    My Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => handleCloseSession()}
                    
                  >
                    Close
                  </button>
                </li>
                              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-fill position-relative m-0 py-2 px-0" style={{ overflowX: 'hidden' }}>
        <BackGround variant={variant}/>
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