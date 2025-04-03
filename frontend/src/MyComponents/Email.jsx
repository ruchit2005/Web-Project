import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./global.css";

const Email = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    fetch('https://baniyabro.onrender.com/submit-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    if (!validateEmail(emailValue)) {
      setError('Invalid Email Address Format');
    } else
      setError('');
  };

  const handleNavigate = () => {
    navigate('/upload');
  };

  return (
    <>
      {/* Input for Email */}
      <input
        type="text"
        placeholder="Enter Email Address"
        value={email}
        onChange={handleEmailChange}
        className="txt-input"
      />
      {error && <p className="error-message">{error}</p>}
      <br />
      <button onClick={handleNavigate} disabled={!email || !validateEmail(email)}>Get Started</button>
    </>
  );
};

export default Email;