import {React} from "react";
import "../components/login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="addUser">
      <h3>Sign in</h3>
      <form className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
          />
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your Password"
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="login">
        <p>Dont have Account? </p>
        <Link to="/" type="submit" class="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;