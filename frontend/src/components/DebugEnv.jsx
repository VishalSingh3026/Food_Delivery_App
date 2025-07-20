import React from 'react';

const DebugEnv = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  return (
    <div style={{ padding: '10px', border: '1px solid red', margin: '10px' }}>
      <h3>Environment Debug</h3>
      <p>VITE_API_URL: {apiUrl || 'NOT FOUND'}</p>
      <p>import.meta.env: {JSON.stringify(import.meta.env, null, 2)}</p>
    </div>
  );
};

export default DebugEnv;
