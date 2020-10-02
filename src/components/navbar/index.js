import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import icon from './1.png';
import './styles/navbar.css';

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    // return () => {
    //   window.removeEventListener('scroll');
    // };
  }, []);

  return (
    <div className={`navbar ${show && 'navbar_black'}`}>
      <img className='nav_logo' src={logo} alt='FlatFlix logo' />
      <img className='nav_avatar' src={icon} alt='FlatFlix user' />
    </div>
  );
}

export default Navbar;
