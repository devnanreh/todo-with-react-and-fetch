import React, { useState, MouseEvent, useEffect } from "react";

function TaskList() {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    // createNewUser();
  }, []);

  function createNewUser() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/hernan", {
      method: "POST",
      body: JSON.stringify([{ label: "hola", done: false }]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp; //(returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }

  function sendTodoList(toDos) {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr", {
      method: "PUT",
      body: JSON.stringify(toDos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // will be true if the response is successfull
        console.log(resp.status); // the status code = 200 or code = 400 etc.
        console.log(resp.text()); // will try return the exact result as string
        return resp; //(returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }

  const addTask = (e) => {
    e.preventDefault();

    if (!newTask.trim()) {
      alert("ERROR: Tarea en blanco");
      setNewTask("");
      return;
    }

    const task = {
      id: Math.floor(Math.random() * 1000),
      label: newTask,
      done: false,
    };

    setTaskList((oldTaskList) => [...oldTaskList, task]);

    sendTodoList(taskList);

    setNewTask("");
  };

  const deleteToDo = (id) => {
    const newTaskList = taskList.filter((tarea) => tarea.id !== id);
    setTaskList(newTaskList);
  };

  // NO SE PORQUE EL PRIMERO ME DA ERROR Y DESPUES SI FUNCIONA

  return (
    <div
      className="container border mt-3 text-center"
      style={{ width: "400px" }}
    >
      <h1>To-Do List ✍🏼</h1>
      <form className="d-flex justify-content-center p-3" onSubmit={addTask}>
        <input
          className="border-0 border-bottom p-2"
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
                  className="d-flex justify-content-start align-items-center border-bottom"
                  key={tarea.id}
                >
                  {tarea.label}
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
