import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Redirect } from "react-router-dom";

const Login = () => {
  const host_env = process.env.REACT_APP_HOST;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();

  // handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Api Call
      const response = await fetch(`${host_env}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        history("/");
        // window.location = "/";
      } else {
        alert("Invalid credentials.");
      }
    } catch (error) {
      console.log("error :" + error);
    }
  };

  // onChange function
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container col-md-5 shadow p-3 mb-5 bg-body-tertiary rounded ">
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            onChange={onChange}
            value={credentials.email}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={credentials.password}
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-warning ">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
