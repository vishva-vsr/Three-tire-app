import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, [API_URL]);

  const addItem = async () => {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    setName("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>3-Tier App</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="User Name"
      />
      <button onClick={addItem}>Add User</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
