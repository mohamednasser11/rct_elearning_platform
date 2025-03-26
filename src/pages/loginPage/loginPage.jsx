import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/InputsComponent";
import "./loginPage.css";
import { useState } from "react";
import authService from '../../services/authService'
import { useAuth } from "../../contexts/authContext";
import CustomButton from "../../components/customButton/button";

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
      <form className="login-form-container " onSubmit={handleFormSubmit}>
        <div className="inputs-container">
          <label>Email Address</label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your Email Address"
            onChangeFunction={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <Input
            name="password"
            type="password"
            placeholder="Enter your Password"
            onChangeFunction={(e) => {
              setPasword(e.target.value)
            }}
          />
        </div>
        <CustomButton buttonText="Login" type="submit"/>
      </form>
    </div>
  );
};

export default LoginPage;
