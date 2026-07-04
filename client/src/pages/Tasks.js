import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import { getTasks, createTask, toggleTask, deleteTask } from '../services/requests';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', course: '', dueDate: '', priority: 'medium' });

  // fetch tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!form.title) return;
    try {
      const res = await createTask({ title: form.title, course: form.course, due_date: form.dueDate, priority: form.priority });
      setTasks([res.data, ...tasks]);
      setForm({ title: '', course: '', dueDate: '', priority: 'medium' });
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await toggleTask(id);
      setTasks(tasks.map(t => t.id === id ? res.data : t));
    } catch (err) {
      console.error('Failed to toggle task', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      <Navbar />
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '700px' }}>
        <h1>Tasks 📝</h1>
        <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', marginTop: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Add a Task</h3>
          <input placeholder="Task title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inp} />
          <input placeholder="Course (e.g. DSA, CO)" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} style={inp} />
          <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} style={inp} />
          <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} style={inp}>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <button onClick={addTask} style={{ padding: '10px 20px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Add Task</button>
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          {loading && <Spinner />}
          {!loading && tasks.length === 0 && <p style={{ color: '#aaa' }}>No tasks yet. Add one above!</p>}
          {tasks.map(task => (
            <div key={task.id} style={{ background: 'white', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px', opacity: task.done ? 0.5 : 1 }}>
              <input type="checkbox" checked={task.done} onChange={() => handleToggle(task.id)} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '500', textDecoration: task.done ? 'line-through' : 'none' }}>{task.title}</p>
                <p style={{ fontSize: '13px', color: '#888' }}>{task.course} · Due: {task.due_date ? task.due_date.split('T')[0] : 'No date'}</p>
              </div>
              <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: priorityColor[task.priority] + '22', color: priorityColor[task.priority], fontWeight: '500' }}>{task.priority}</span>
              <button onClick={() => handleDelete(task.id)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inp = { display: 'block', width: '100%', padding: '9px 12px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' };

export default Tasks;

