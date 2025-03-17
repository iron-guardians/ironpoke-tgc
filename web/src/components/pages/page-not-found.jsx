import { PageLayout } from '../layouts';

function PageNotFound() {
  return (
    <PageLayout>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
      }}>
        <img className='noSets' src="/404.png" alt="Page not found" />
      </div>    
    </PageLayout>
  );
}

export default PageNotFound;