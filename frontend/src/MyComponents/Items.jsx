import React from 'react';
import "./global.css";

const Item = ({ link, name, price, imgSrc }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className='card-link'>
      <div className='card'>
        <img src={imgSrc} alt='Product'/>
        <div className='details'>
          <h1>{name}</h1>
          <div className='price'><h3>{price}</h3></div>
        </div>
      </div>
    </a>
  );
};

export default Item;