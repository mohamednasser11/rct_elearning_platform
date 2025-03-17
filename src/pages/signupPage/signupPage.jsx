import Input from "../../components/Inputs/InputsComponent";

const SignupPage = () => {
  return (
    <div className="page-container">
      <h1>Sign Up</h1>
      <form className="form-container">
        <div className="inputs-container">
          <Input name="userName" type="text" placeholder="Name" />
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
        </div>
        <button className="btn-submit" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
