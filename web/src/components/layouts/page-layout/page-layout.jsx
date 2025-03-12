import BackGround from "../../backGround/BackGround";
import logo from '/images/descarga.svg';
function PageLayout ({ children }) {
  return (   
    <div className="min-vh-100 d-flex flex-column">      
      <header className="fixed-top custom-header-bg text-white text-center p-0 m-0"> 
        <div className="logo-containerh">
          <img 
            src={logo} 
            alt="Logo Animado" 
            className="animated-logo" 
          />
        </div>
      </header>
      <main className="flex-fill position-relative m-0 py-2 px-0" style={{ overflowX: 'hidden' }}>
        <BackGround />
        <div className="container-fluid px-5 mx-1">
          {children}
        </div>
      </main>
      <footer className="fixed-bottom custom-header-bg text-white text-center py-3">
        <small>&copy; 2025 Pokemon API. Todos los derechos reservados.</small>
      </footer>
    </div>
  );
};

export default PageLayout;