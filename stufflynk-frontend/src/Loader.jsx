import React from 'react';

const Loader = () => {
  return (
    <div style={{ backgroundColor: '#000', color: '#00ff00', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>
      <div style={{ border: '2px solid #00ff00', padding: '20px' }}>
        [ SISTEMA INICIANDO ]
      </div>
    </div>
  );
};

export default Loader;
