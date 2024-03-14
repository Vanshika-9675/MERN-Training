import React from 'react'
import notFound from "./assets/not-found.png";

function NotFound() {
  return (
    <div className='not-found'>
         <h1>DATA NOT FOUND!!!</h1>
        <img height={100} width={100} src={notFound} alt="" />
    </div>
  )
}

export default NotFound