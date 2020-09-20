import styled ,{css}from 'styled-components'
import Tooltip from '../Tooltip'

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}
export const Container = styled.div<ContainerProps>`
  background: #F5F4F6 0% 0% no-repeat padding-box;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 1px solid #EBEAED;
  color: #666360;
  display: flex;
  align-items: center;
  
  & + div,
  & + button{
    margin-top:12px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
   
   
  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #000;
    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`;


export const Error = styled(Tooltip)`
    height: 20px;
    margin-left:16px;

    span {
        background: #c53030;
        color: #fff;
    }

    &::before{
        border-color: #c53030 transparent;
    }
`;