import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import "./SignupPage.css";
import "../../components/inputs/Inputs.styles.css";

const CustomButton = ({ buttonText, type, handleOnClick }) => {
  return (
    <button className="btn-custom" type={type} onClick={handleOnClick}>
      {buttonText}
    </button>
  );
};

const Input = ({type, placeholder, name, onChangeFunction}) => {
  return (
    <input className="input" name={name} type={type} placeholder={placeholder} onChange={onChangeFunction} />
  );
};

const SignupPage = () => {
  const [error, setError] = useState(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignUpOnSubmit = async (event) => {
    event.preventDefault();
    setError(undefined);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }
  
    try {
      await signup(email, password, name);
      navigate("/"); // Redirect to home page after successful sign-up
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="signup-container">
        <h1>Create an account</h1>
        <p className="subtitle">Enter your information to create an account</p>
        {error && <p className="error-message">{error}</p>}
        
        <form className="form-container" onSubmit={handleSignUpOnSubmit}>
          <div className="inputs-container">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <Input 
                name="name" 
                type="text" 
                placeholder="Mohamed" 
                onChangeFunction={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Email Address</label>
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
                placeholder=" * * * * * * * * * " 
                onChangeFunction={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <Input 
                name="confirmPassword" 
                type="password" 
                placeholder=" * * * * * * * * * " 
                onChangeFunction={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="terms-container">
            <label className="terms-label">
              <input 
                type="checkbox" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>I agree to the <a href="/terms" className="terms-link">terms and conditions</a></span>
            </label>
          </div>
          
          <CustomButton buttonText="Create Account" type="submit" />
        </form>
        
        <div className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export { CustomButton, Input, SignupPage as default };
