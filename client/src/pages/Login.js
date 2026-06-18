import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/requests';

function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    if (isSignup && !form.name) { setError('Name is required'); return; }
    setLoading(true);
    try {
      if (isSignup) {
        await registerUser({ name: form.name, email: form.email, password: form.password });
        setIsSignup(false);
        setError('');
      } else {
        const res = await loginUser({ email: form.email, password: form.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '360px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '0.25rem' }}>Study Planner 📚</h2>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '1.5rem' }}>{isSignup ? 'Create an account' : 'Welcome back!'}</p>
        {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '10px' }}>{error}</p>}
        {isSignup && <input placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />}
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={inputStyle} />
        <button onClick={handleSubmit} disabled={loading} style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '14px', color: '#666' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => { setIsSignup(!isSignup); setError(''); }} style={{ color: '#4f46e5', cursor: 'pointer' }}>
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

