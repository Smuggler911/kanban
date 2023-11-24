import axios, { AxiosError } from "axios";
import { autorun, makeAutoObservable, observable, runInAction } from "mobx";
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
  public static values: data = observable({
    data: [],
  });
  public static toDo: list = {
    task: "",
  };
  public static getBoard = autorun(async () => {
    const response = await axios.get("http://localhost:8000/Board");
    const res = await response.data;

    const currentBoardId = Number(localStorage.getItem("kanbanId") || "");
    let Id = currentBoardId + 1;
    const values = Object.values(res) as Array<board>;
    runInAction(() => {
      values.forEach((value) => {
        if (value.id === Id) {
          console.log(value.id);
          this.values.data = [value];
          this.values.data = this.values.data.map((item) => {
            return item;
          });
        } else {
          this.values.data = [];
        }
      });
      console.log(this.values.data);
    });
  });

  constructor() {
    makeAutoObservable(this);
  }

  public static handleAddTask = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    this.values.data.map((item) => {
      const currentBoardId = Number(localStorage.getItem("kanbanId") || "");
      let Id = currentBoardId + 1;
      runInAction(() => {
        if (item.id == Id) {
          this.toDo.task = value;
          if (name in this.toDo) {
            this.toDo[name as keyof list] = value;
          }
        }
      });
    });
  };
  public static formHandle = async (
    event: React.FormEvent<HTMLFormElement>,
    id: number,
    key: number,
  ) => {
    event.preventDefault();
    try {
      await runInAction(async () => {
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
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error:", axiosError.message);
      } else {
        console.log("Error:", error);
      }
    }
  };
  public static deleteTodoFromBoard = async (
    key: number,
    task: string,
    id: number,
  ) => {
    await runInAction(async () => {
      const data = this.values.data;
      const dataIndex = data.map((item) => {
        console.log(task);
        return item[key].ToDo.findIndex((todo: list) => todo.task === task);
      });
      data.map((item) => {
        if (Number(dataIndex) !== -1) {
          item[key].ToDo = item[key].ToDo.filter(
            (todo: list) => todo.task !== task,
          );
        }
      });
      try {
        await axios.put(
          `http://localhost:8000/Board/${id}`,
          data.map((item) => {
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
    });
  };
}
