import React from 'react';
import BackGround from "../../backGround/BackGround";
import NavBar from './nav-bar.jsx';

function PageLayout({ children, variant }) {
  return (
    <div className="d-flex flex-column pt-5">
       <header className="fixed-top custom-header-bg text-white p-0 m-0">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Columna izquierda: Home */}
            <div className="col-4">
              <NavBar />
              
            </div>
          </div>
        </div>
      </header>
      <main className="page-content flex-fill position-relative" style={{ overflowX: 'hidden' }}>
        <BackGround variant={variant}/>
        <div className="container-fluid">
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






