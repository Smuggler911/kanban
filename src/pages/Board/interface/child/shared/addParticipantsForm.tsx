import React from "react";
import Participants from "./participantsStore";
import "./addParticipants.scss";
import Board from "../childStore";
export const addParticipantsForm = () => {
  const { getParticipants, users } = Participants;
  const { addParticipant } = Board;
  window.addEventListener("load", async () => {
    await getParticipants();
  });
  const add = async (name: string) => {
    const currentBoardId = Number(localStorage.getItem("kanbanId") || "");
    let Id = currentBoardId + 1;
    await addParticipant(name, currentBoardId, Id);
  };
  return (
    <div className={"addParticipantsForm-wrapper"}>
      <div className={"addParticipants-items"}>
        {users.users.map((user) => (
          <div className={"item"}>
            <p>{user.login}</p>
            <div className={"item-add"}>
              <button
                onClick={(event: React.MouseEvent<HTMLSpanElement>) =>
                  add(user.login)
                }
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
