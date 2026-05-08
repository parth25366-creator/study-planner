import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Tasks', path: '/tasks' },
  ];

  return (
    <div style={{ background: 'white', borderBottom: '1px solid #eee', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '2rem', height: '56px' }}>
      <span style={{ fontWeight: '600', color: '#4f46e5', fontSize: '16px' }}>Study Planner 📚</span>
      <div style={{ display: 'flex', gap: '4px' }}>
        {links.map(link => (
          <button key={link.path} onClick={() => navigate(link.path)} style={{
            padding: '6px 14px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px',
            background: location.pathname === link.path ? '#ede9fe' : 'transparent',
            color: location.pathname === link.path ? '#4f46e5' : '#555',
            fontWeight: location.pathname === link.path ? '500' : '400'
          }}>
            {link.label}
          </button>
        ))}
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <button onClick={() => navigate('/login')} style={{ padding: '6px 14px', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '13px', color: '#555' }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
