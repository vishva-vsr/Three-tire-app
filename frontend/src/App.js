import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const addUser = async () => {
    if (!name) return;
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setName('');
    } catch (err) {
      console.error("Add user error:", err);
    }
  };

  return (
    <div>
      <h1>3-Tier App</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <button onClick={addUser}>Add User</button>
      <ul>
        {users.map((user, i) => <li key={i}>{user.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
