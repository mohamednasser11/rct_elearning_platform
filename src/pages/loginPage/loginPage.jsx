import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/InputsComponent";
import "./loginPage.css";
import { useState } from "react";
import authService from '../../services/authService'
import { useAuth } from "../../hooks/authContext";

const LoginPage = () => {
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password)

      if (authService.isAuthenticated()){
        navigate("/"); // Redirect to home page after successful login
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="form-container" onSubmit={handleFormSubmit}>
        <div className="inputs-container">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChangeFunction={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChangeFunction={(e) => {
              setPasword(e.target.value)
            }}
          />
        </div>
        <button className="btn-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
