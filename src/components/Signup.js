import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const host_env = process.env.REACT_APP_HOST;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();

  // handleChnage function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Api Call
      const response = await fetch(`${host_env}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log("Signed up,");
      console.log(json);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        history("/");
        // window.location = "/";
      }
    } catch (error) {
      console.log("error :" + error);
    }
  };

  // onCHange function
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container col-md-5 shadow p-3 mb-5 bg-body-tertiary rounded">
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            htmlFor="name"
            className="form-control"
            id="name"
            name="name"
            placeholder="name@example.com"
            onChange={onChange}
            minLength="3"
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <div className="form-floating">
            <input
              onChange={onChange}
              type="email"
              htmlFor="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInputGroup1">Email address</label>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={onChange}
            type="password"
            htmlFor="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            minLength="5"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={onChange}
            type="password"
            htmlFor="cpassword"
            className="form-control"
            id="cpassword"
            placeholder="Confirm Password"
            name="cpassword"
          />
          <label htmlFor="floatingPassword">Confirm Password</label>
        </div>
        <div className="col-6  mx-auto">
          <button
            type="submit"
            className="btn btn-warning mx-2"
            disabled={!(credentials.password === credentials.cpassword)}
          >
            Sign up
          </button>
          <button className="btn btn-warning mx-2 ">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
