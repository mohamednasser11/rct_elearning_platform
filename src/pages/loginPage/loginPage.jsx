import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/InputsComponent";
import { useAuth } from "../../contexts/authContext";
import ForgotPasswordModal from "../../components/ForgotPasswordModal/ForgotPasswordModal";
import "./loginPage.css";
import "../../components/inputs/Inputs.styles.css";

const LoginPage = () => {
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
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
                placeholder="example@example.com" 
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
            <a href="#" onClick={() => setShowForgotPasswordModal(true)}>Forgot Password?</a>
          </div>
        </form>
      </div>
      {showForgotPasswordModal && <ForgotPasswordModal onClose={() => setShowForgotPasswordModal(false)} />}
    </div>
  );
};

export default LoginPage;
