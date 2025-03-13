import { useForm } from "react-hook-form";
import * as IronPokeApi from "../../../services/api-service";
import { useAuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleRegister = async (user) => {
    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);

    try {
      await IronPokeApi.register(user);

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
      <h2>Register</h2>

      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-user fa-fw"></i>
          </span>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="John Doe"
            {...register("name", { required: "Username is required" })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-envelope fa-fw"></i>
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
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-lock fa-fw"></i>
          </span>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="****"
            {...register("password", { required: "Mandatory field" })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <div className="d-grid">
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;