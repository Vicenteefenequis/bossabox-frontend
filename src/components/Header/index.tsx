import React from 'react';
import './index.css'
// import { Container } from './styles';

interface IProps{
    title?:string,
    description?:string
}

const Header: React.FC<IProps> = ({title,description}) => {
  return(
     <div className="header">
         <div className="header-essencial">
             <h1 className="title-header">{title}</h1>
             <h4 className="description-header">{description}</h4>
         </div>
     </div> 
  );
}

export default Header;