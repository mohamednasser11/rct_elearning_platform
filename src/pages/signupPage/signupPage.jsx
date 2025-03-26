import { useState } from "react";
import Input from "../../components/Inputs/InputsComponent";
import { useAuth } from "../../contexts/authContext";
import "./signupPage.css"
import CustomButton from "../../components/customButton/button";

const SignupPage = () => {
  const [error, setError] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setUserName] = useState("");
  const {signUp} = useAuth();

  const handleSingUpOnSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await signUp(email, password, userName, firstName, lastName);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="page-container">
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="form-container" onSubmit={handleSingUpOnSubmit}>
        <div className="inputs-container">
          <Input name="userName" type="text" placeholder="Name" onChangeFunction={(e) => setUserName(e.target.value)} />
          <div className="horizontalContainer">
          <Input name="first_name" type="text" placeholder="First Name" onChangeFunction={(e) => setfirstName(e.target.value)}/>
          <Input name="last_name" type="text" placeholder="Last Name" onChangeFunction={(e) => setlastName(e.target.value)}/>
          </div>
          <Input name="email" type="email" placeholder="Email"  onChangeFunction={(e) => setEmail(e.target.value)}/>
          <Input name="password" type="password" placeholder="Password"  onChangeFunction={(e) => setPassword(e.target.value)}/>
        </div>
        <CustomButton buttonText="Sign Up" type="submit"/>
      </form>
    </div>
  );
};

export default SignupPage;
