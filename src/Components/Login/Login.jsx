import React, { useState } from "react";
import "./Login.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Login = () => {
  const [user, setUser] = useState({});
  const [unameError, setUnameError] = useState({});
  const [passError, setPassError] = useState({});

  const signIn = () => {
    let error = 0;
    setUnameError({});
    setPassError({});

    if (user.userId === "" || user.userId === undefined) {
      setUnameError({ ...unameError, error: "Please enter User Id" });
      error = 1;
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        user.userId
      )
    ) {
      setUnameError({ ...unameError, error: "Please enter valid User Id" });
      error = 1;
    }

    if (user.password === "" || user.password === undefined) {
      setPassError({ ...passError, error: "Please enter password" });
      error = 1;
    }

    if (error === 0) {
      window.location = "/project";
    }
  };

  return (
    <div className="container">
      <div className="login__form">
        <AccountCircleIcon className="login__icon" style={{ fontSize: 60 }} />
        <h1 className="signIn__text">Sign In</h1>
        <div>
          {/* <i><EmailIcon /></i> */}
          <input
            type="text"
            placeholder="Email"
            className="login__input"
            onChange={(e) => setUser({ ...user, userId: e.target.value })}
          ></input>
          <span className="error">
            {unameError.error != undefined ? unameError.error : " "}
          </span>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="login__input"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <span className="error">
            {passError.error != undefined ? passError.error : " "}
          </span>
        </div>
        <button className="button__submit" onClick={() => signIn()}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
