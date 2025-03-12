import BackGround from "../../backGround/BackGround";
import logo from '../../images/descarga.svg';
const PageLayout = ({ children }) => {
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
      
      <main className="flex-fill position-relative m-0 p-0">
        <BackGround />
        <div className="container">
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

  