import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://172.21.204.246:5000/api/hello')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const addItem = async () => {
    const res = await fetch('http://172.21.204.246:5000/api/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    setName('');
  };

  return (
    <div>
      <h1>3-Tier App</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Item Name" />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => <li key={index}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
