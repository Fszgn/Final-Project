import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root{
    --color-navbar-beige:#F5F3EE;
    --color-black: #0F0F0F;
    --color-green: #016340;
}

*{
    margin:0;
    padding: 0;
   font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
h1{
color:var(--color-green);
}
`;
