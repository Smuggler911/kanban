import React, { useRef } from "react";
import "./Kanban.scss";
import KanbanBoards from "../store";
import { observer } from "mobx-react";
import plusButton from "../assets/plus-large-svgrepo-com.svg";
import exitButton from "../assets/cross-svgrepo-com.svg";
import Board from "./childStore";
import deleteButton from "../assets/deleteButton.svg";
import { addParticipantsForm } from "./shared/addParticipantsForm";

export const Kanban = observer(() => {
  const { getKanbanBoards } = KanbanBoards;
  const { getBoard, values, handleAddTask, formHandle, deleteTodoFromBoard } =
    Board;
  window.addEventListener("load", async () => {
    getBoard();
    await getKanbanBoards();
  });

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

  const todoItem = useRef<HTMLDivElement>(null);

  const deleteFromBoard = async (task: string) => {
    const currentBoardId = Number(localStorage.getItem("kanbanId") || "");
    let Id = currentBoardId + 1;
    if (todoItem.current !== null) {
      todoItem.current.style.transform = "translateX(10%)";
      todoItem.current.style.transition = "all .3s ";
    }
    await deleteTodoFromBoard(currentBoardId, task, Id);
  };
  const participantsForm = useRef<HTMLDivElement>(null);

  const OpenParticipantsForm = () => {
    if (participantsForm.current !== null && boardContainer.current !== null) {
      participantsForm.current.style.display = "flex";
      boardContainer.current.style.opacity = "20%";
      boardContainer.current.style.transition = "all .3s ";
    }
  };
  if (participantsForm.current !== null) {
    participantsForm.current.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        participantsForm.current !== null &&
        boardContainer.current !== null
      ) {
        participantsForm.current.style.display = "none";
        boardContainer.current.style.opacity = "100%";
        boardContainer.current.style.transition = "all .3s ";
      }
    });
  }

  return (
    <>
      <div className={"kanbanBoard-header"}>
        <div className={"kanban-name"}>
          <h1>{kanbanData.name}</h1>
        </div>
        <div className={"kanbanBoard_addParticipants"}>
          <p>Add participants:</p>
          <button onClick={OpenParticipantsForm}>
            <img src={plusButton} />
          </button>
        </div>
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
              <div className={"items"} key={item.id}>
                {item[key].ToDo.map((i: { task: string }, key: number) => (
                  <div className={"item"} key={key} ref={todoItem}>
                    <span
                      onClick={(event: React.MouseEvent<HTMLSpanElement>) =>
                        deleteFromBoard(i.task)
                      }
                    >
                      <img src={deleteButton} />
                    </span>
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
      <div className={"participantsForm"} ref={participantsForm}>
        {addParticipantsForm()}
      </div>
    </>
  );
});
