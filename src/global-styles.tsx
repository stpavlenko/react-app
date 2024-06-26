import styled, { createGlobalStyle } from "styled-components";
import { Button } from "antd";

const GlobalStyles = createGlobalStyle`
    :root {
        --m-default: 0.5rem;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: var(--bg);
        color: var(--color)
    }

    html[data-theme=light] {
        --bg: white;
        --color: #213547;
    }

    html[data-theme=dark] {
        --bg: #242424;
        --color: #fff;

    }

`;

export const StyledButton = styled(Button)`
  &.ant-btn {
    &:disabled {
      background-color: #fff;
    }
  }
`;

export default GlobalStyles;
