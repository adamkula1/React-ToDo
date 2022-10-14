import React, { ChangeEvent, FC, useState, useEffect } from "react";
import TodoTask from "./Components/TodoTask";
import { ITask, IFormInput } from "./Interfaces";
import {
  useForm,
  SubmitHandler,
} from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import subDays from "date-fns/subDays";
import CompleteTask from "./Components/CompleteTask";
import UncompleteTask from "./Components/UncompleteTask";

const messageRequiredTitle = "Title je povinný.";
const messageRequiredTask = "Text je povinný.";
const messageRequiredDeadline = "Dátum je povinný.";
const messageRequiredSelect = "Select je povinný.";

const App: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<string>();
  const [completed, setCompleted] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [uncompleteTasks, setUncompleteTasks] = useState<ITask[]>([]);
  const [completeTasks, setCompleteTasks] = useState<ITask[]>([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    formState,
    watch,
  } = useForm<IFormInput>();

  const watchAllSelect = watch("Select");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else if (event.target.name === "title") {
      setTitle(event.target.value);
    } else {
      setDeadline(event.target.value);
    }
  };

  const onSubmit = (data: IFormInput): void => {
    const newTask = {
      taskTitle: data.Title,
      taskName: data.Task,
      taskDeadline: data.Deadline,
      taskCompleted: completed,
    };

    setUncompleteTasks([...uncompleteTasks, newTask]);
    setTodoList([...todoList, newTask]);

    // setTask(newTask.taskTitle);
    // setTask(newTask.taskName);
    // setDeadline(newTask.taskDeadline);
    reset();
    console.log(data);
    console.log(newTask);
  };

  const uncompleteTask = (): void => {
    const newTask = {
      taskTitle: title,
      taskName: task,
      taskDeadline: deadline,
      taskCompleted: completed,
    };
    setUncompleteTasks([...uncompleteTasks, newTask]);
  };

  function completeTask(taskNameToDone: string, taskNameCompleted: boolean): void {
    setCompleteTasks(
      todoList.filter((task) => {
        return task.taskName === taskNameToDone;
      })
    );

    setUncompleteTasks(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDone;
      })
    );
    // setCompleted(!completed);
    // console.log(taskNameToDone);
    // console.log(completed);
    console.log(todoList);
  }

  const deleteTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );

    setCompleteTasks(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );

    setUncompleteTasks(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="input-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="input-field">
              <div className="form-control">
                <label className="label-input">Title</label>
                <TextField
                  type="text"
                  id="title"
                  placeholder="Title task"
                  {...register("Title", {
                    required: true,
                    maxLength: 30,
                  })}
                  onChange={handleChange}
                />

                {errors.Title && errors.Title.type === "required" && (
                  <Alert severity="error" className="error-form-message">
                    {messageRequiredTitle}
                  </Alert>
                )}
                {errors.Title && errors.Title.type === "maxLength" && (
                  <Alert severity="error" className="error-form-message">
                    Maximálna dĺžka prekročená.
                  </Alert>
                )}
              </div>

              <div className="form-control">
                <label className="label-input">Text</label>
                <TextField
                  type="text"
                  id="task"
                  placeholder="Task task"
                  {...register("Task", {
                    required: true,
                    maxLength: 20,
                  })}
                  onChange={handleChange}
                />

                {errors.Task && errors.Task.type === "required" && (
                  <Alert severity="error" className="error-form-message">
                    {messageRequiredTask}
                  </Alert>
                )}
                {errors.Task && errors.Task.type === "maxLength" && (
                  <Alert severity="error" className="error-form-message">
                    Maximálna dĺžka prekročená.
                  </Alert>
                )}
              </div>

              <div className="form-control">
                <label className="label-input">Deadline</label>
                <TextField
                  type="datetime-local"
                  id="deadline"
                  placeholder="Datum"
                  {...register("Deadline", {
                    required: true,
                  })}
                  onChange={handleChange}
                />

                {errors.Deadline && errors.Deadline.type === "required" && (
                  <Alert severity="error" className="error-form-message">
                    {messageRequiredDeadline}
                  </Alert>
                )}
              </div>
            </section>

            <section className="wrap-submit">

              <Button
                variant="contained"
                className="btn-submit"
                type="submit"
                id="submit"
              >
                Add Task
              </Button>
            </section>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                label="Select"
                {...register("Select", { required: true })}
              >
                <MenuItem value="All tasks">All tasks</MenuItem>
                <MenuItem value="Uncomplete">Uncomplete</MenuItem>
                <MenuItem value="Complete">Complete</MenuItem>
              </Select>
            </FormControl>

            {errors.Select && errors.Select.type === "required" && (
              <Alert severity="error" className="error-form-message">
                {messageRequiredSelect}
              </Alert>
            )}
          </form>
        </div>
      </div>

      {watchAllSelect === "All tasks" && (
        <div className="todoList">
          {todoList.map((task: ITask, key: number) => {
            return (
              <TodoTask
                key={key}
                task={task}
                deleteTask={deleteTask}
                completeTask={completeTask}
                completed={completed}
              />
            );
          })}
        </div>
      )}

      {watchAllSelect === "Uncomplete" && (
        <div className="uncompleteList">
          {uncompleteTasks.map((task: ITask, key: number) => {
            return (
              <UncompleteTask
                key={key}
                task={task}
                deleteTask={deleteTask}
                completeTask={completeTask}
                uncompleteTask={uncompleteTask}
                completed={completed}
              />
            );
          })}
        </div>
      )}

      {watchAllSelect === "Complete" && (
        <div className="completeList">
          {completeTasks.map((task: ITask, key: number) => {
            return (
              <CompleteTask
                key={key}
                task={task}
                deleteTask={deleteTask}
                completeTask={completeTask}
                completed={completed}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
