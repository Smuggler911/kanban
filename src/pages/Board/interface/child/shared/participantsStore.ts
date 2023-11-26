import axios, { AxiosError } from "axios";
import { makeAutoObservable, observable, runInAction } from "mobx";
import React from "react";
interface User {
  id: number;
  login: string;
  email: string;
  password: string;
}

type participants = {
  users: Array<User>;
};
export default class Participants {
  public static users: participants = observable({
    users: [],
  });

  constructor() {
    makeAutoObservable(this);
  }
  public static getParticipants = async () => {
    try {
      await runInAction(async () => {
        const response = await axios.get("  http://localhost:8000/users");
        const data = await response.data;
        this.users.users = [...data];
      });
      console.log(this.users.users);
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      console.log("error", axiosError);
    }
  };
}
