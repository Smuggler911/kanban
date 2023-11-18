import "./login.scss";
import Auth from "./store";
import React, { ChangeEvent, FormEvent } from "react";
import { observer } from "mobx-react";

export const Login = observer(() => {
  const { handleLogin, CheckMail, auth } = Auth;
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleLogin(event);
  };
  const OnFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    CheckMail(event);
  };
  return (
    <>
      <form onSubmit={OnFormSubmit}>
        <div className={"login-form"}>
          <div className={"form-email"}>
            <input
              type={"email"}
              name={"email"}
              placeholder={"email"}
              onChange={onInputChange}
            />
          </div>
          <div className={"form-password"}>
            <input
              type={"password"}
              name={"password"}
              placeholder={"password"}
            />
          </div>
          <div className={"form-button"}>
            <button type={"submit"}>logIn</button>
          </div>
        </div>
      </form>
    </>
  );
});
