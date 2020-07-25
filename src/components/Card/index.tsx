import React from 'react';
import './index.css'

interface IProps{
  items:{
    id:number,
    title:string,
    description:string
    link:string
    tags:[]
  }[]
}

const Card: React.FC<IProps> = ({items}) => {
  return (
    <div className="card">
      {items.map(it=>(
          <div className="card-header">
              <h1>{it.title}</h1>
              <p>{it.description}</p>
              <p>{it.tags.map(tag => tag).join(' ,')}</p>
          </div>
      ))}
      
    </div>
  );
}

export default Card;