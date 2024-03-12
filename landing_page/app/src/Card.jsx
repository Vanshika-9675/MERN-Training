import React from 'react';
import './Card.css'
import Button from './Button';

function Card() {
  return (
    <div className="Card">
      <div className="CardHeader">
        <h3>Title</h3>
      </div>
      <div className="CardBody">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet tempor massa.</p>
      </div>
      <div className="CardFooter">
        <Button />
      </div>
    </div>
  );
}

export default Card;

