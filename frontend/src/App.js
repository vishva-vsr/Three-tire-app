import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://mern-backend:5000";

  useEffect(() => {
    fetch(`${API_URL}/api/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = async () => {
    if (!name) return;
    const res = await fetch(`${API_URL}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setName("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>MongoDB MERN Lite Todo</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Todo name"
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={addTodo} style={{ padding: "5px 10px" }}>
        Add
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
