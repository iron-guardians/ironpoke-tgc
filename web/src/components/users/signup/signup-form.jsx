import { useForm } from "react-hook-form";
import * as IronPokeApi from "../../../services/api-service";
import { useAuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const { register, handleSubmit, formState, setError } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const errors = formState.errors;

  const handleRegister = async (user) => {
    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);

    try {
      await IronPokeApi.register(formData);

      const data = await IronPokeApi.login(user);

      login(data);

      navigate("/");
    } catch (error) {
      const { data } = error.response;

      Object.keys(data.errors).forEach((inputName) =>
        setError(inputName, { message: data.errors[inputName] })
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="mb-3">
      <label htmlFor="username" className="form-label custom-label">User Name</label>
      <div className="input-group">
        <span className="input-group-text bg-success text-white">
          <i className="fa fa-user"></i>
        </span>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="John Doe"
            {...register("name", { required: "Mandatory field" })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div> </div>
        <div className="mb-3">
      <label htmlFor="email" className="form-label custom-label">email</label>
      <div className="input-group">
        <span className="input-group-text bg-success text-white">
          <i className="fa fa-envelope"></i>
        </span>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="user@example.org"
            {...register("email", { required: "Mandatory field" })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div> </div>
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
            {...register("password", { required: "Mandatory field" })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div> </div>

        <div className="d-grid">
          <button className="btn btn-success w-100 custom-button" type="submit">
            Register
          </button>
          <button className="btn btn-outline-secondary w-100 mt-3" onClick={() => navigate("/login")}>
          <i className="fa fa-arrow-left me-2"></i>
          Login
        </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;