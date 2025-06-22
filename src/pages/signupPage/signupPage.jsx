import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import Input from "../../components/inputs/InputsComponent";
import CustomButton from "../../components/customButton/CustomButton";
import "./signupPage.css";

const SignupPage = () => {
  const [error, setError] = useState(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

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
      await signUp(email, password, username, firstName, lastName);
      navigate("/login");
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
              <label className="input-label">First Name</label>
              <Input
                name="name"
                type="text"
                placeholder="Mohamed"
                onChangeFunction={(e) => setFirstName(e.target.value)}
              />
              <label className="input-label">Last Name</label>
              <Input
                name="name"
                type="text"
                placeholder="Ahmed"
                onChangeFunction={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Username</label>
              <Input
                name="name"
                type="text"
                placeholder="mohammed"
                onChangeFunction={(e) => setUsername(e.target.value)}
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
              <span>
                I agree to the{" "}
                <a href="/terms" className="terms-link">
                  terms and conditions
                </a>
              </span>
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
