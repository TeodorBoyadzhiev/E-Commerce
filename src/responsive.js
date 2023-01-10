import { css } from "styled-components";

// 320px
export const mobile = (props) => {
    return css`
    @media only screen and (max-width:414px){
        ${props}
    }
    `;
};
// 414px
export const mobileMedium = (props) => {
    return css`
    @media only screen and (max-width:640px){
        ${props}
    }
    `;
};
// 640px
export const mobileLarge = (props) => {
    return css`
    @media only screen and (max-width:720px){
        ${props}
    }
    `;
};

export const tablet = (props) => {
    return css`
    @media only screen and (min-width:960px){
        ${props}
    }
    `;
};