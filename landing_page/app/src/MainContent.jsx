
import React from 'react';
import Button from './Button';
import Card from './Card';
import './MainContent.css'
function MainContent() {
  return (
    <main>
      <div className="parent">
      <Card />
      <Card />
      <Card />
      </div>
    </main>
  );
}

export default MainContent;
