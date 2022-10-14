import React from "react";
import { ITask, IFormInput } from "../Interfaces";

interface Props {
  task: ITask;
  // data: IFormInput;
  deleteTask(taskNameToDelete: string): void;
  completeTask(taskNameToDone: string, taskNameCompleted: boolean): void;
  completed: boolean
}

const TodoTask = ({ task, deleteTask, completeTask, completed }: Props) => {
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
        <div className="todoList">
          <div className="content">
            <h1 className={task.taskCompleted ? "completed" : ""}>{task.taskTitle}</h1>
            <p className={task.taskCompleted ? "completed task" : "task"}>{task.taskName}</p>
            <span className={task.taskCompleted ? "completed" : ""}>{task.taskDeadline}</span>
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

export default TodoTask;
