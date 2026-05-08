import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !password) { alert('Please fill in all fields'); return; }
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '360px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '0.25rem' }}>Study Planner 📚</h2>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '1.5rem' }}>{isSignup ? 'Create an account' : 'Welcome back!'}</p>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        <button onClick={handleSubmit} style={btnStyle}>{isSignup ? 'Sign Up' : 'Login'}</button>
        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '14px', color: '#666' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => setIsSignup(!isSignup)} style={{ color: '#4f46e5', cursor: 'pointer' }}>
            {isSignup ? 'Login' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px 12px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' };
const btnStyle = { width: '100%', padding: '10px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', fontSize: '15px', cursor: 'pointer' };

export default Login;
