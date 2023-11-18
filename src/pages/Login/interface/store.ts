import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import React from "react";
interface User {
  id: number;
  login: string;
  email: string;
  password: string;
}
type auth = {
  email: string;
};
class Auth {
  static auth: auth = {
    email: "",
  };
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
    console.log(userExits);
    window.location.href = "/";
  };
}
export default Auth;
