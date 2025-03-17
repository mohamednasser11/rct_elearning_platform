import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Inputs";
import "./loginPage.css";
import { useState } from "react";
import authService from '../../services/authService'

const LoginPage = () => {
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [rememberME, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(`>>>>>>> email => ${email}, password ==> ${password}`)
      await authService.login(email, password, rememberME);
      navigate("/"); // Redirect to home page after successful login
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
              console.log(`>>>>>> ${e.target.value}`)
              setPasword(e.target.value)
            }}
          />
          <div className="remember-me-checkbox-container">
            <Input
              id="checkbox-remember-me"
              name="remember-me"
              type="checkbox"
              placeholder="Remember me"
              onChangeFunction={(e) => setRememberMe(e.target.value)}
            />
            <label>Remember Me</label>
          </div>
        </div>
        <button className="btn-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
