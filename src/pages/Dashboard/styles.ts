import styled from 'styled-components';
import {shade} from 'polished'
import { Tooltip } from '@material-ui/core';


export const Card = styled.div`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 20px 25px #0000001A;
    margin-top: 12px;
    border-radius: 5px;
    opacity: 1;
    padding:12px;
    transition: transform 0.2s;
    max-width:600px;
  
    h1{
        color:"#0000";
    }
    &:hover{
        transform: translateX(10px);
    }
    div{
        display:flex;
        justify-content:space-between;
        align-items:center;
    }
    button{
        display:flex;
        justify-content:center;
        align-items:center;
        background: #F95E5A 0% 0% no-repeat padding-box;
        border-radius: 5px;
        opacity: 1;
        border:0;
        padding:6px;
        color:white;
        transition: background 500ms;
    }
    button:hover{
        background: ${shade(0.2,"#F95E5A")};
    }
    
  
`;

export const InputSearch = styled.input`
    position:relative;
    padding-left:20px;
    max-width:200px;
    height: 50px;
    flex: 1;
    background: #F5F4F6 0% 0% no-repeat padding-box;
    border: 1px solid #EBEAED;
    border-radius: 5px;
    outline:1;
    opacity: 1;
    &::placeholder {
      color: #B1ADB9;
    }

   

`;
export const ContainerItemsFromMenu = styled.div`
  margin-top:24px;
  display: flex;
  flex-direction: column;
  max-width:500px;
  margin: 0 auto;
  margin-top:12px;
  
 
`;



export const GroupSearch = styled.div` 
    display:flex;
    justify-content:center;
    align-items:center;
    & > button{
        margin-left:24px;
    }
    strong{
        color:white;
        font-size:12px;
    }
  
`;

export const TypographyBody = styled.p`
    font: normal normal normal 20px/26px 'Roboto';
    letter-spacing: 0.4px;
    color: #7159C1;
    opacity: 1;
`;


export const ContainerCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  max-width: 700px;
`;



export const Input = styled.input `
    min-width: 300px;
    padding:12px;
    height: 50px;
    background: #F5F4F6 0% 0% no-repeat padding-box;
    border: 1px solid #EBEAED;
    border-radius: 5px;
    opacity: 1;
    margin-bottom:12px;
    
`;
export const Error = styled(Tooltip)`
    height: 20px;
    margin-left:16px;
    
`;

export const ModalController = styled.div`
   display:flex;
   flex-direction:column;
   max-width:600px;
   margin: 0 auto;
`;

