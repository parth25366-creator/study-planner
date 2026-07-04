import React from 'react';

function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div style={{
      background: '#fef2f2', border: '1px solid #fecaca',
      color: '#dc2626', padding: '10px 14px',
      borderRadius: '6px', fontSize: '13px', marginBottom: '12px'
    }}>
      ⚠️ {message}
    </div>
  );
}

export default ErrorBanner;
