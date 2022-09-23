import React, { useState, MouseEvent } from "react";

function TaskList() {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      alert("ERROR: Tarea en blanco");
      setNewTask("");
      return;
    }

    const task = {
      id: Math.floor(Math.random() * 1000),
      value: newTask,
    };

    setTaskList((oldTaskList) => [...oldTaskList, task]);
    setNewTask("");
  };

  const deleteToDo = (id) => {
    const newTaskList = taskList.filter((tarea) => tarea.id !== id);
    setTaskList(newTaskList);
  };

  return (
    <div
      className="container border mt-3 text-center"
      style={{ width: "400px" }}
    >
      <h1>ToDo's ✍🏼</h1>
      <form className="d-flex justify-content-center p-3" onSubmit={addTask}>
        <input
          className="border-0 border-bottom"
          type="text"
          value={newTask}
          placeholder="Agrega una tarea"
          autoFocus
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="btn btn-primary ms-1"
          type="button"
          onClick={addTask}
        >
          Agregar
        </button>
      </form>
      <ul>
        {taskList.length == 0
          ? "No hay tareas pendientes 😳"
          : taskList.map((tarea) => {
              return (
                <li
                  className="d-flex justify-content-start align-items-center border-top border-bottom"
                  key={tarea.id}
                >
                  {tarea.value}
                  <button
                    className="btn btn-danger btn-sm ms-auto"
                    onClick={() => deleteToDo(tarea.id)}
                  >
                    X
                  </button>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default TaskList;
