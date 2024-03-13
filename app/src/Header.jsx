import React from 'react';
import './Header.css'

function Header() {
  return (
    <header>
      <h1>Landing Page</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
