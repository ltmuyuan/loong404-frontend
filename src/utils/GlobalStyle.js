import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`

  html {
      background: #eeeae7;
      min-height: 100%;
      width: 100%;
      font-family: Helvetica Neue,Arial,Microsoft YaHei,sans-serif;
  }
  
  
  *{
      color:#fffc;
      padding: 0;
      margin: 0;
  }
  a{
      text-decoration: none;
  }

  ul,li,dl,dd,dt{
      list-style: none;
      padding: 0;
      margin: 0;
  }
  .mainBody{
      width: 1130px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      @media (max-width: 1270px) {
        width: 100%;
          box-sizing: border-box;
      }
  }

  input:focus{
      outline: none;
  }
  button{
      cursor: pointer;
  }
  input[type="number"] {
      -moz-appearance: textfield; /* Firefox */
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none; /* Safari */
  }
`;

export default GlobalStyle;
