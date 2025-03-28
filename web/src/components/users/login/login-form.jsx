import { useForm } from "react-hook-form";
import * as IronPokeApi from "../../../services/api-service";
import { useAuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";


function LoginForm() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    try {
      user = await IronPokeApi.login(user);
      login(user);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        const { data } = error.response;
        Object.keys(data.errors).forEach((inputName) =>
          setError(inputName, { message: data.errors[inputName] })
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} data-testid="login-form">
        <div className="input-group mb-1">
        <label htmlFor="username" className="form-label custom-label">Email</label>
      <div className="input-group">
        <span className="input-group-text bg-success text-white">
          <i className="fa fa-user"></i>
        </span>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="user@example.org"
            data-testid="email-input"
            {...register("email", { required: "Mandatory field" })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        </div>
        <div className="mb-3">
      <label htmlFor="password" className="form-label custom-label">Password</label>
      <div className="input-group">
        <span className="input-group-text bg-success text-white">
          <i className="fa fa-lock"></i>
        </span>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""} `}
            placeholder="****"
            data-testid="password-input"
            {...register("password", { required: "Mandatory field" })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div> </div>
        <div className="d-grid">
          <button className="btn btn-success w-100 custom-button" type="submit">
            Login
          </button>
        </div>
      </form>
      <div className="d-grid mt-2">
        <button className="btn btn-outline-success w-100 mt-3" onClick={() => navigate("/signup")}>
          Sign Up     
          <i className="fa fa-arrow-right ms-2"></i>
        </button>
      </div>
    </div>
  );
}

export default LoginForm;