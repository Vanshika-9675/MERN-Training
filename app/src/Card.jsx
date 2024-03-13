import React from 'react';
import './Card.css'
import Button from './Button.jsx';


function Card({title,description,list,btnText}) {
  return (
    <div className="Card">
      <div className="CardHeader">
        <h2>{title}</h2>
      </div>
      <div className="CardBody">
        <h3 style={{marginBottom:'20px'}}>{description}</h3>
        <ul style={{ textDecoration: 'none', textAlign: 'center', listStyleType: 'none' , display:'flex' , flexDirection:'column', gap:'8px'}}>
          {list.map((item, ind) => (
            <li key={ind}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="CardFooter">
        <Button text={btnText}/>     
      </div>
    </div>
  );
}

export default Card;

