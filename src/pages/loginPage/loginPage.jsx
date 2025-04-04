import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../SignupPage/SignupPage";
import { useAuth } from "../../contexts/authContext";
import "./LoginPage.css";
import "../../components/inputs/Inputs.styles.css";

// Social media icons
import { FaGoogle, FaGithub, FaTwitter, FaMicrosoft } from "react-icons/fa";

const LoginPage = () => {
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, socialLogin } = useAuth();

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

  const handleSocialLogin = async (provider) => {
    try {
      await socialLogin(provider);
      navigate("/"); // Redirect to home page after successful social login
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
        <h1>Log In</h1>
        {error && <p className="error-message">{error}</p>}
        
        <form className="form-container" onSubmit={handleLoginSubmit}>
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
              onChangeFunction={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <CustomButton buttonText="Log In" type="submit" />
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <div className="social-login-container">
          <button 
            className="social-button google" 
            onClick={() => handleSocialLogin("google")}
          >
            <FaGoogle className="social-icon" />
            <span>Log in with Google</span>
          </button>
          
          <button 
            className="social-button github" 
            onClick={() => handleSocialLogin("github")}
          >
            <FaGithub className="social-icon" />
            <span>Log in with GitHub</span>
          </button>
          
          <button 
            className="social-button twitter" 
            onClick={() => handleSocialLogin("twitter")}
          >
            <FaTwitter className="social-icon" />
            <span>Log in with Twitter</span>
          </button>
          
          <button 
            className="social-button microsoft" 
            onClick={() => handleSocialLogin("microsoft")}
          >
            <FaMicrosoft className="social-icon" />
            <span>Log in with Microsoft</span>
          </button>
        </div>
        
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
