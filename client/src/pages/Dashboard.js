import React from 'react';
import Navbar from '../components/Navbar';

function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      <Navbar />
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Dashboard 👋</h1>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>Welcome back! Here's what's coming up.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
          {[
            { label: 'Total Tasks', value: '0', color: '#4f46e5' },
            { label: 'Due This Week', value: '0', color: '#f59e0b' },
            { label: 'Completed', value: '0', color: '#10b981' },
          ].map(card => (
            <div key={card.label} style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <p style={{ color: '#888', fontSize: '13px' }}>{card.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: '600', color: card.color }}>{card.value}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2rem', background: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h3>Upcoming Deadlines</h3>
          <p style={{ color: '#aaa', marginTop: '1rem', fontSize: '14px' }}>No tasks yet. Add some from the Tasks page!</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
