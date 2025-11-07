'use client';
import { useState } from 'react';
import { useLocalStorage } from '../../lib/useLocalStorage';

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage('tasks:v1', []);
  const [text, setText] = useState('');

  const add = () => {
    if (!text.trim()) return;
    setTasks([{ id: Date.now(), text: text.trim(), done: false }, ...tasks]);
    setText('');
  };

  const toggle = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id) => setTasks(tasks.filter(t => t.id !== id));
  const clearDone = () => setTasks(tasks.filter(t => !t.done));

  const remaining = tasks.filter(t => !t.done).length;

  return (
    <div>
      <h1>Tasks</h1>
      <div className="panel" style={{ marginBottom: 16 }}>
        <div className="row">
          <input className="input" value={text} onChange={e => setText(e.target.value)} placeholder="Add a task..." onKeyDown={e => e.key==='Enter' && add()} />
          <button className="btn" onClick={add}>Add</button>
          <button className="btn ghost" onClick={clearDone} disabled={!tasks.some(t=>t.done)}>Clear done</button>
        </div>
        <div className="small" style={{ marginTop: 8 }}>{remaining} remaining</div>
      </div>

      <ul className="panel" style={{ listStyle: 'none', padding: 0 }}>
        {tasks.length === 0 && <div className="small">No tasks yet. Add your first one!</div>}
        {tasks.map(t => (
          <li key={t.id} className="row" style={{ justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1d2746' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              <span style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#9fb0d5' : 'inherit' }}>{t.text}</span>
            </label>
            <button className="btn secondary" onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
