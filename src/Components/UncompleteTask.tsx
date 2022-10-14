import React from "react";
import { ITask, IFormInput } from "../Interfaces";

interface Props {
  task: ITask;
  // data: IFormInput;
  deleteTask(taskNameToDelete: string): void;
  completeTask(taskNameToDelete: string, taskNameCompleted: boolean): void;
  uncompleteTask(taskNameToDelete: string): void;
  completed: boolean;
}

const UncompleteTask = ({
  task,
  deleteTask,
  completeTask,
  uncompleteTask,
  completed
}: Props) => {
  return (
    <>
      <section className="wrap-box">
        <button
          className="delete"
          onClick={() => {
            deleteTask(task.taskName);
          }}
        >
          X
        </button>
        <div className="uncompleteList">
          <div className="content">
            <h1>{task.taskTitle}</h1>
            <p className="task">{task.taskName}</p>
            <span>{task.taskDeadline}</span>
          </div>

          <button
            className="done"
            onClick={() => {
              completeTask(task.taskName, task.taskCompleted = true);
            }}
          >
            Done
          </button>
        </div>
      </section>
    </>
  );
};

export default UncompleteTask;
