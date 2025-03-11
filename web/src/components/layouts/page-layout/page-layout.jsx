import BackGround from "../../backGround/BackGround";
const PageLayout = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <BackGround />
      <header className="bg-dark text-white text-center py-4">
        <h1 className="mb-0">Pokemon API</h1>
      </header>
      <main className="container flex-fill my-4">
        {children}
      </main>
      <footer className="bg-dark text-white text-center py-3">
        <small>&copy; 2025 Pokemon API. Todos los derechos reservados.</small>
      </footer>
    </div>
  );
};

export default PageLayout;

  