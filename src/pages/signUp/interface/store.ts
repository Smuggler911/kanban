import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import React from "react";

type User = {
  login: string;
  email: string;
  password: string;
};

class UserStore {
  static user: User = {
    login: "",
    email: "",
    password: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  static handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name in this.user) {
      this.user[name as keyof User] = value;
    }
  };
  static submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(" http://localhost:8000/users", this.user);
      window.location.href = "/login";
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error:", axiosError.message);
      } else {
        console.log("Error:", error);
      }
    }
  };
}

export default UserStore;
