import { PageLayout } from "../layouts";
import { RegisterForm } from "../users";

function SignUp  () {
    return (
      <PageLayout>
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Sign Up</h2>
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  };
  
  export default SignUp;