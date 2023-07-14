import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Alert from "./Alert";
import ReCAPTCHA from "react-google-recaptcha";

const Signup = (props) => {
  const host_env = process.env.REACT_APP_HOST;
  const site_key_env = process.env.REACT_APP_SITE_KEY;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let history = useNavigate();

  // ---------Recaptcha variable and function ------------
  // const [verifyCaptcha, setVerifyCaptcha] = useState(false);
  // const onChangeCaptcha = (value) => {
  //   if (value) {
  //     console.log("Captcha value:", value);
  //     setVerifyCaptcha(true);
  //   } else {
  //     setVerifyCaptcha(false);
  //   }
  // };

  // handleChnage function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Api Call
      if (
        credentials.name === "" ||
        credentials.email === "" ||
        credentials.tag === ""
      ) {
        props.showAlert("Enter all the credentials.", "warning");
      } else if (credentials.password !== credentials.cpassword) {
        props.showAlert(
          "Password and confirm password do not match.",
          "danger"
        );
      }
      // else if (!verifyCaptcha) {
      //   props.showAlert("Verify reCAPTCHA.", "danger");
      // }
      else {
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
        //console.log("Signed up,");
        console.log(json);
        if (json.success) {
          // Save the auth token and redirect
          localStorage.setItem("token", json.authtoken);
          props.showAlert(
            "Thanks for signing up with us " + credentials.name + ".",
            "success"
          );
          history("/");
          // window.location = "/";
        } else {
          props.showAlert("Invalid credentials", "danger");
        }
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
    <div className="container col-md-5 mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
      <form onSubmit={handleSubmit}>
        <h3 className="mb-4">Sign up to use create notes.</h3>
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
              autoComplete="username"
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
            autoComplete="new-password"
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
            autoComplete="confirm-password"
          />
          <label htmlFor="floatingPassword">Confirm Password</label>
        </div>
        {/* <div className="form-floating mb-3">
          <ReCAPTCHA sitekey={site_key_env} onChange={onChangeCaptcha} />
        </div> */}

        <div className=" d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-warning mx-2"
            // disabled={!(credentials.password === credentials.cpassword)}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
