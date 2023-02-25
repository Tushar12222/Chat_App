import React, { useContext, useState } from "react";
import swal from "sweetalert";
import usersContext from "../Global state variables and functions/users/UsersContext";

export default function Signup() {
  const context = useContext(usersContext);
  const { createUser } = context;
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(
      details.username,
      details.email,
      details.password,
      details.confirmpassword
    );
    swal(
      "Success",
      "User created, login in using the registered credentials!",
      "success"
    );
    setDetails({
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  };
  return (
    <>
      <br />
      <div className="container text-center">
        <h3>Sign Up</h3>
      </div>
      <br />
      <form className="container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            UserName
          </label>
          <input
            type="text"
            value={details.username}
            className="form-control"
            id="username"
            onChange={handleChange}
            name="username"
            aria-describedby="emailHelp"
            aria-required
          />
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

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            name="confirmpassword"
            type="password"
            onChange={handleChange}
            value={details.confirmpassword}
            className="form-control"
            id="exampleInputPassword1"
            aria-required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </>
  );
}
