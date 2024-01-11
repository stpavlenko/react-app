import styled, { createGlobalStyle } from "styled-components";
import { Button, Table } from "antd";

const GlobalStyles = createGlobalStyle`
    :root {
        --m-default: 0.5rem;
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
