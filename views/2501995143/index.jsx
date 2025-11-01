import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef();
  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Raphael Vinzenzio Kent Hartono - 2501995143</h1>

      <p>
        I am studying Computer Science at Bina Nusantara University. I'm passionate about developing games, building scalable web applications and learning modern frameworks like React.
      </p>
      <input
        ref={inputRef}
        type="text"
        placeholder="Unknown"
        style={{
          padding: '8px',
          margin: '10px 0',
          width: '200px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />

      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Click {count} times
      </button>
      <p style={{ marginTop: '10px' }}>
        Doubled Count: <strong>{doubled}</strong>
      </p>
    </div>
  );
};

export default MyPage;