import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const API_URL = process.env.REACT_APP_API_URL; // from .env

  // Fetch items once when component mounts
  useEffect(() => {
    fetch(`${API_URL}/api/hello`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error fetching items:', err));
  }, [API_URL]);

  // Add new item
  const addItem = async () => {
    try {
      const res = await fetch(`${API_URL}/api/hello`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const newItem = await res.json();
      setItems([...items, newItem]);
      setName('');
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div>
      <h1>3-Tier App</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Item Name"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => <li key={index}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
