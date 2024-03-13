
import React from 'react';
import Button from './Button';
import Card from './Card';
import './MainContent.css'

const items = [
                 {title:"Electronics",desc:"Available electronics items are: ", list:["Laptop","Phone","Charger"], btn:"Buy Electronics"} , 
                 {title:"Clothing", desc:"Available Clothing categories are: ", list:["Men","Women","Children"], btn:"Buy Clothing"},
                 {title:"Groceries",desc:"Available Groceries items are: ", list:["Fruits","Vegentables","Beverages"], btn:"Buy Groceries"}
             ]
function MainContent() {
  return (
    <main>
      <div className="parent">
         {
           items.map(x=>(
              <Card title={x.title} description={x.desc} list={x.list} btnText={x.btn}/>
           ))
         }
      </div>
    </main>
  );
}

export default MainContent;
