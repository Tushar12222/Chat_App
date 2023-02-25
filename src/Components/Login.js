import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import usersContext from "../Global state variables and functions/users/UsersContext";
import Spinner from "./Spinner";

export default function Login() {
  const navigate = useNavigate();

  const context = useContext(usersContext);
  const { loginUser, loading } = context;
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(details.email, details.password);
  };
  return (
    <>
    <br />
      <div className="container text-center">
        <h3>Login</h3>
      </div>
      
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <br />
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={details.email}
            name="email"
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            aria-required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={details.password}
            className="form-control"
            id="exampleInputPassword1"
            aria-required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>

      {loading && <Spinner />}
    </>
  );
}
