import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./global.css";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const [FadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 3100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      navigate('/start');
    }
  }, [loading, navigate]);

  return (
    <>
      {loading ? (
        <div className="logo2">
          <h1>
            <span className="Baniya">Baniya</span>
            <span className="Bro">Bro</span>
          </h1>
        </div>
      ) : null}
    </>
  );
}

export default Loader;