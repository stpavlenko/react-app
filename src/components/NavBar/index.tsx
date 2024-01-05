import { Link } from "react-router-dom";
import {
  PAGINATION_ROUTE,
  FORM_ROUTE,
  BULBASAUR_ROUTE,
  IVYSAUR_ROUTE,
} from "../../app/routes/config";
import type { MenuProps } from "antd";
import { Menu, Button, Switch, ConfigProvider } from "antd";
import { useState } from "react";
import styled from "styled-components";

interface NavBarProps {
  isAuth: boolean;
  setIsAuth: (isAuthenticated: boolean) => void;
}

export const StyledMenu = styled(Menu)`
  background: inherit;
  color: inherit;
  margin-bottom: 0.5rem;

  .ant-menu-item-active {
    color: inherit !important;
  }
`;

const NavBar: React.FC<NavBarProps> = ({ isAuth, setIsAuth }) => {
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("light");

  const changeColorTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setCurrentTheme(newTheme);
  };

  const toggleAuth = () => {
    setIsAuth(!isAuth);
  };

  const authButtonText = isAuth ? "Log out" : "Log in";

  const items: MenuProps["items"] = [
    {
      label: <Link to={PAGINATION_ROUTE}>Pagination</Link>,
      key: "pagination",
    },
    {
      label: <Link to={BULBASAUR_ROUTE}>Bulbasaur</Link>,
      key: "bulbasaur",
    },
    {
      label: <Link to={IVYSAUR_ROUTE}>Ivysaur</Link>,
      key: "ivysaur",
    },
  ];

  const authItems: MenuProps["items"] = [
    {
      label: <Link to={FORM_ROUTE}>Form</Link>,
      key: "Form",
    },
  ];

  const actionItems: MenuProps["items"] = [
    {
      label: (
        <Switch
          onChange={changeColorTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          defaultChecked={currentTheme === "dark"}
        />
      ),
      key: "theme",
    },
    {
      label: <Button onClick={toggleAuth}>{authButtonText}</Button>,
      key: "auth",
    },
  ];

  if (isAuth) items.push(...authItems);
  items.push(...actionItems);

  return <StyledMenu mode="horizontal" items={items} />;
};

export default NavBar;
