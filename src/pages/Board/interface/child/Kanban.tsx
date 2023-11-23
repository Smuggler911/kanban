import React, { useRef } from "react";
import "./Kanban.scss";
import KanbanBoards from "../store";
import { observer } from "mobx-react";
import plusButton from "../assets/plus-large-svgrepo-com.svg";
import exitButton from "../assets/cross-svgrepo-com.svg";
import Board from "./childStore";

export const Kanban = observer(() => {
  const { getKanbanBoards } = KanbanBoards;
  const { getBoard, values, handleAddTask, formHandle } = Board;

  getKanbanBoards();
  getBoard();

  const kanbanData = JSON.parse(localStorage.getItem("currentBoard") || "");
  const createToDoForm = useRef<HTMLDivElement>(null);
  const boardContainer = useRef<HTMLDivElement>(null);
  const ExitForm = () => {
    if (createToDoForm.current !== null && boardContainer.current !== null) {
      createToDoForm.current.style.display = "none";
      boardContainer.current.style.opacity = "100%";
      boardContainer.current.style.transition = "all .3s ";
    }
  };
  const EnterForm = () => {
    if (createToDoForm.current !== null && boardContainer.current !== null) {
      createToDoForm.current.style.display = "flex";
      boardContainer.current.style.opacity = "20%";
      boardContainer.current.style.transition = "all .3s ";
    }
  };
  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const currentBoardId = Number(localStorage.getItem("kanbanId") || "");
    let Id = currentBoardId + 1;
    await formHandle(event, Id, currentBoardId);
  };
  return (
    <>
      <div className={"kanbanBoard-header"}>
        <div className={"kanban-name"}>
          <h1>{kanbanData.name}</h1>
        </div>
        <div className={"kanbanBoard"} ref={boardContainer}>
          <div className={"toDo"}>
            <div className={"toDo-header"}>
              <h1>To Do</h1>
              <div className={"header-button"}>
                <button onClick={EnterForm}>
                  <img src={plusButton} />
                </button>
              </div>
            </div>
            <div className={"toDo-items"}>
              {values.data.map((item, key) => (
                <div className={"items"} key={key}>
                  {item[key].ToDo.map((i: { task: string }, key: number) => (
                    <div className={"item"} key={key}>
                      <p key={key}>{i.task}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={"inProgress"}>
            <div className={"inProgress-header"}>
              <h1>in Progress</h1>
            </div>
          </div>
          <div className={"Done"}>
            <div className={"Done-header"}>
              <h1>Done</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={"createToDo"} ref={createToDoForm}>
        <form onSubmit={formSubmit}>
          <div className={"exit-ToDoCreation"}>
            <span onClick={ExitForm}>
              <img src={exitButton} />
            </span>
          </div>
          <div className={"toDoCreation-header"}>
            <h1>Create new Task</h1>
          </div>
          <div className={"toDoCreation-taskInput"}>
            <textarea
              onChange={handleAddTask}
              placeholder={"create new task"}
              name={"task"}
            ></textarea>
          </div>
          <div className={"toDoCreation-submit"}>
            <button onClick={ExitForm} type={"submit"}>
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
});
