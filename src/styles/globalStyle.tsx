import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;
        font-size: 16px;

        color: rgba(255, 255, 255, 0.87);
        background-color: #191919;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
    }
    a:hover {
        color: #535bf2;
    }

    //CSS-reset
    body {
        margin: 0;
        padding: 0;
        display: flex;
        min-width: 320px;
        min-height: 100vh;
        box-sizing: border-box;
    }

    #root{
        padding: 0;
        max-width: none;
        flex-grow: 1;
    }

    h1 {
        font-size: 1.2rem;
        line-height: 1.1;
    }
`;

export default GlobalStyle;
