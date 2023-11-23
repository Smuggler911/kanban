import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import React from "react";

type list = {
  task: string;
};

interface board {
  id: number;
  name: string;
  ToDo: Array<list>;
  inProgress: Array<list>;
  Done: Array<list>;

  [key: number]: any;
}

type data = {
  data: Array<board>;
};
export default class Board {
  static values: data = {
    data: [],
  };
  static toDo: list = {
    task: "",
  };
  constructor() {
    makeAutoObservable(this);
  }
  static getBoard = async () => {
    const response = await axios.get("http://localhost:8000/Board");
    const res = await response.data;
    const currentBoardId = Number(localStorage.getItem("kanbanId") || "");
    let Id = currentBoardId + 1;
    const values = Object.values(res) as Array<board>;
    values.forEach((value) => {
      if (value.id === Id) {
        this.values.data = [value];
        this.values.data = this.values.data.map((item) => {
          return item;
        });
      }
    });
    console.log("ass");
  };
  static handleAddTask = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    this.values.data.map((item) => {
      const currentBoardId = Number(localStorage.getItem("kanbanId") || "");
      let Id = currentBoardId + 1;
      if (item.id == Id) {
        this.toDo.task = value;
        if (name in this.toDo) {
          this.toDo[name as keyof list] = value;
        }
      }
    });
  };
  static formHandle = async (
    event: React.FormEvent<HTMLFormElement>,
    id: number,
    key: number,
  ) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/Board/${id}`,
        this.values.data.map((item) => {
          if (item[key] && !item[key].ToDo) {
            item[key].ToDo = [];
          }
          if (item[key]) {
            item[key].ToDo.push(this.toDo);
          }
          return item[key];
        }),
      );
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
