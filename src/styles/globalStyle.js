import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`

    :root{
        --cor1: #00ff9c;
        --cor2: #1e1e1d;
        --cor3: #f5f5f5;
        --font1: "Nunito", sans-serif
    }

    *{
        padding: 0;
        margin: 0;
        overflow-x: hidden;
    }

`

export default globalStyle