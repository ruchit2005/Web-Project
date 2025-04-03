import React from 'react'
import "./global.css"
import Logo from "./Logo"
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <div className="header" onClick={handleNavigate}>
      <Logo />
    </div>
  )
}

export default Header;