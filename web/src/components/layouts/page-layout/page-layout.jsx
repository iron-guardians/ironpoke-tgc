import React from 'react';
import BackGround from "../../backGround/BackGround";

function PageLayout({ children, variant }) {
  return (
    <div className="min-vh-100 d-flex flex-column pt-5">
      <main className="flex-fill position-relative" style={{ overflowX: 'hidden' }}>
        <BackGround variant={variant}/>
        <div className="container-fluid">
          {children}
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
