import axios, { AxiosError } from "axios";
import { makeAutoObservable, observable, runInAction } from "mobx";
import React from "react";
interface kanbanBoard {
  name: string;
  owner: string;
  id: number;
}
type Data = {
  response: Array<kanbanBoard>;
};
export default class KanbanBoards {
  static data: Data = observable({
    response: [],
  });
  constructor() {
    makeAutoObservable(this);
  }
  static getKanbanBoards = async () => {
    const response = await axios.get("http://localhost:8000/kanbanBoards");
    const data = await response.data;
    runInAction(() => {
      this.data.response = [...data];
      console.log(this.data.response);
      return this.data.response;
    });
  };
}
type kanban = {
  name: string;
  owner: string;
};
export class CreateKanban {
  static kanban: kanban = {
    name: "",
    owner: "",
  };
  constructor() {
    makeAutoObservable(this);
  }
  static handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    const ownerName = localStorage.getItem("auth");
    this.kanban.owner = String(ownerName);
    if (name in this.kanban) {
      this.kanban[name as keyof kanban] = value;
    }
  };
  static submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("  http://localhost:8000/kanbanBoards", this.kanban);
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
