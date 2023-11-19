import axios, { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import React from "react";
import { observable } from "mobx";
interface User {
  id: number;
  login: string;
  email: string;
  password: string;
}

type auth = {
  email: string;
};
type check = {
  authorized: boolean;
};

class Auth {
  static auth: auth = {
    email: "",
  };
  static check: check = observable({
    authorized: false,
  });

  constructor() {
    makeAutoObservable(this);
  }

  static getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      return await response.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      console.log("error", axiosError);
    }
  };
  static handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target) return;
    const name = event.target.name;
    const value = event.target.value;

    this.auth.email = value;

    if (name in this.auth) {
      return (this.auth[name as keyof typeof this.auth] = value);
    }
  };
  static CheckMail = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event.target);
    const users = await Auth.getUsers();
    const userExits = users.some(
      (user: User) => user.email === this.auth.email,
    );
    if (userExits) {
      users.forEach((user: User) => {
        if (user.email === this.auth.email) {
          localStorage.setItem("auth", user.login);
          runInAction(() => {
            this.check.authorized = true;
            localStorage.setItem(
              "authorized?",
              JSON.stringify(this.check.authorized),
            );
          });
          window.location.href = "/";
        }
      });
    }
  };
}

export default Auth;
