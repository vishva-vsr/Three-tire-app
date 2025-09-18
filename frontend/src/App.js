import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  // Use environment variable, fallback to localhost
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch all items on mount
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error fetching items:', err));
  }, [API_URL]);

  // Add a new item
  const addItem = async () => {
    if (!name) return;
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (!res.ok) throw new Error('Failed to add item');
      setItems([...items, { name }]);
      setName('');
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>3-Tier App</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Item Name"
          style={{ padding: '5px', marginRight: '5px' }}
        />
        <button onClick={addItem} style={{ padding: '5px 10px' }}>
          Add Item
        </button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
