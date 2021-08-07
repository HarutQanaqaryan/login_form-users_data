import React from "react";
import { TextField } from "@material-ui/core";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { Users } from "./get_users";

export const SignUp = () => {
  const [isModal, setIsModal] = useState(true);
  const [login, setLogin] = useState({ text: "", isValid: false });
  const [password, setPassword] = useState({ text: "", isValid: false });
  const [email, setEmail] = useState({ text: "", isValid: false });
  const [phone, setPhone] = useState({ text: "", isValid: false });
  const [isDisabled, setIsDisabled] = useState(true);
  const firstRender = useRef(true);
  let pattern = "";

  const validationTextField = (value, pattern, password1, password2) => {
    return !pattern.test(value) ? true : false;
  };

  const checkPattern = (name) => {
    switch (name) {
      case "login":
        pattern = /^[a-zA-Z]{3,15}$/;
        break;
      case "password":
        pattern = /^[a-zA-Z0-9_-]{6,18}$/;
        break;
      case "email":
        pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        break;
      case "phone":
        pattern = /^\+7\d*$/;
        break;
      default:
        return;
    }
  };

  const handleInput = ({ target: { value, name } }) => {
    checkPattern(name);
    switch (name) {
      case "login":
        setLogin({ text: value, isValid: validationTextField(value, pattern) });
        break;
      case "password":
        setPassword({
          text: value,
          isValid: validationTextField(value, pattern),
        });
        break;
      case "email":
        setEmail({ text: value, isValid: validationTextField(value, pattern) });
        break;
      case "phone":
        setPhone({ text: value, isValid: validationTextField(value, pattern) });
        break;
      default:
        return;
    }
  };

  const disabledBtn = () => {
    if (login.isValid === true || login.text === "") {
      setIsDisabled(true);
    } else if (password.isValid === true || password.text === "") {
      setIsDisabled(true);
    } else if (email.isValid === true || email.text === "") {
      setIsDisabled(true);
    } else if (phone.isValid === true || phone.text === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    disabledBtn();
  });
  return (
    <div>
     {isModal && <div className="sign-up-container">
        <h2 className="header">Please log in to see users</h2>
        <span className="login">
          <TextField
            error={login.isValid}
            name="login"
            label="Login"
            variant="outlined"
            helperText={login.isValid ? "login must consist of 3-15 characters and only Latin letters" : ""}
            style={{ width: "100%" }}
            value={login.text}
            onChange={handleInput}
          />
        </span>
        <span className="password">
          <TextField
            error={password.isValid && true}
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            helperText={password.isValid ? "The password must be 6-18 characters long and only Latin letters" : ""}
            style={{ width: "100%" }}
            value={password.text}
            onChange={handleInput}
          />
        </span>
        <span className="email">
          <TextField
            error={email.isValid && true}
            name="email"
            label="E-mail"
            variant="outlined"
            helperText={email.isValid ? "Mail should look like this: johnsmith@gmail.com" : ""}
            style={{ width: "100%" }}
            value={email.text}
            onChange={handleInput}
          />
        </span>

        <div className="phone">
          <TextField
            error={phone.isValid && true}
            name="phone"
            label="Phone"
            variant="outlined"
            helperText={phone.isValid ? "Phone should look like this: +7 1002007474" : ""}
            style={{ width: "100%" }}
            onChange={handleInput}
          />
        </div>
        <button disabled={isDisabled && true} className="button" onClick={() => setIsModal(false)}>
          Sign Up
        </button>
      </div>}
      {!isModal && <Users />}
    </div>
  );
};
