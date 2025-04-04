import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../SignupPage/SignupPage";
import { useAuth } from "../../contexts/authContext";
import "./LoginPage.css";
import "../../components/inputs/Inputs.styles.css";

const LoginPage = () => {
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError(undefined);
  
    try {
      await login(email, password);
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const CustomButton = ({ buttonText, type, handleOnClick }) => {
    return (
      <button className="btn-custom" type={type} onClick={handleOnClick}>
        {buttonText}
      </button>
    );
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h1>Sign in to your account</h1>
        <p className="subt">Enter your credentials to access your account</p>
        {error && <p className="error-message">{error}</p>}
        
        <form className="form-container" onSubmit={handleLoginSubmit}>
          <div className="inputs-container">
            <div className="input-group">
              <label className="input-label">Email</label>
              <Input 
                name="email" 
                type="email" 
                placeholder="examples@examples.com" 
                onChangeFunction={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Password</label>
              <Input 
                name="password" 
                type="password" 
                placeholder="* * * * * * * * *" 
                onChangeFunction={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <CustomButton buttonText="Log In" type="submit" />
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
