import styled from "styled-components";
import { Menu } from "antd";

export const StyledMenu = styled(Menu)`
  background: inherit;
  color: inherit;
  margin-bottom: 0.5rem;

  .ant-menu-item-active {
    color: inherit !important;
  }
`;
