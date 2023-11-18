import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import React from "react";

const Server_URL = "http://localhost:8000/users";
type user_log = {
  login: string;
};
class UserLog {
  static user_log: user_log = {
    login: "",
  };
  constructor() {
    makeAutoObservable(this);
  }
  static getUser = async (query: string, endPoint = Server_URL) => {
    try {
      query ? (query = `?${query}`) : { query: " " };
      const response = await axios.get(`${endPoint}${query}`);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      console.log("Error:", axiosError.message);
    }
  };
}
