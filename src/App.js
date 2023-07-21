import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
uuidv4();

export default function App() {
  const [todoes, setTodoes] = useState([]);

  function addToDoes(todo) {
    setTodoes([
      ...todoes,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  }
  function toggelCompleted(id) {
    setTodoes(
      todoes.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  function deletTodo(id) {
    setTodoes(todoes.filter((todo) => todo.id !== id));
  }
  function editTodo(id) {
    setTodoes(
      todoes.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }
  function editTask(task, id) {
    setTodoes(
      todoes.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  }
  return (
    <div className="App">
      <div className="TodoWrapper">
        <Header />
        <Form addToDoes={addToDoes} />
        {todoes.map((todo, i) =>
          todo.isEditing ? (
            <EditTodoForm key={i} editTodo={editTask} task={todo} />
          ) : (
            <Todo
              task={todo}
              key={i}
              toggelCompleted={toggelCompleted}
              deletTodo={deletTodo}
              editTodo={editTodo}
            />
          )
        )}
      </div>
    </div>
  );

  function Header() {
    return (
      <div>
        <h1> Task List</h1>
      </div>
    );
  }
}

function Form({ addToDoes }) {
  const [value, setValue] = useState("");

  function handelSubmit(e) {
    e.preventDefault();
    if (value === "") return;
    addToDoes(value);
    setValue("");
  }

  return (
    <form className="TodoWrapper" onSubmit={handelSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="What is Task todo? "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="todo-btn">Add Task</button>
    </form>
  );
}

function Todo({ task, toggelCompleted, deletTodo, editTodo }) {
  return (
    <div className="Todo">
      <p
        onClick={() => toggelCompleted(task.id)}
        className={`${task.completed ? "completed" : ""}`}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon icon={faTrash} onClick={() => deletTodo(task.id)} />
      </div>
    </div>
  );
}

function EditTodoForm({ editTodo, task }) {
  const [value, setValue] = useState(task.task);

  function handelSubmit(e) {
    e.preventDefault();
    if (value === "") return;
    editTodo(value, task.id);
    setValue("");
  }

  return (
    <form className="TodoWrapper" onSubmit={handelSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="Update the Task? "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="todo-btn">Update Task</button>
    </form>
  );
}
