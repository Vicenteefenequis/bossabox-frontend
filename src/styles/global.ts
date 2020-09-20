import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    outline:0;
    list-style:none;
  }
  code{
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
  body {
    background: #312E38;
    -webkit-font-smoothing:antialiased;
    margin: 0;
     font-family: 'Roboto';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body ,input , button {
    font-family:'Roboto Slab', serif;
    font-size:16px;
  }
  h1,h2,h3,h4,h5,h6,strong{
    font-weight:500;
    color:"#170C3A";
  }
  p{
    font-size:12px;
  }
  button{
    cursor:pointer;
  }
`;