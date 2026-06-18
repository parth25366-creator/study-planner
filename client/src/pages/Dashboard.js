import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getTasks } from '../services/requests';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const dueThisWeek = tasks.filter(t => {
    if (!t.due_date) return false;
    const due = new Date(t.due_date);
    const now = new Date();
    const weekAhead = new Date();
    weekAhead.setDate(now.getDate() + 7);
    return due >= now && due <= weekAhead;
  }).length;

  const upcoming = tasks.filter(t => !t.done).slice(0, 5);

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      <Navbar />
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Dashboard 👋</h1>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>Welcome back, {user.name || 'Student'}!</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
          {[
            { label: 'Total Tasks', value: total, color: '#4f46e5' },
            { label: 'Due This Week', value: dueThisWeek, color: '#f59e0b' },
            { label: 'Completed', value: completed, color: '#10b981' },
          ].map(card => (
            <div key={card.label} style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <p style={{ color: '#888', fontSize: '13px' }}>{card.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: '600', color: card.color }}>{card.value}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2rem', background: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h3>Upcoming Deadlines</h3>
          {upcoming.length === 0
            ? <p style={{ color: '#aaa', marginTop: '1rem', fontSize: '14px' }}>No pending tasks. Add some from the Tasks page!</p>
            : upcoming.map(t => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: '14px' }}>{t.title}</span>
                <span style={{ fontSize: '13px', color: '#aaa' }}>{t.due_date ? t.due_date.split('T')[0] : 'No date'}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
