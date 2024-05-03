import type { MenuProps } from "antd";
import { Button, Switch } from "antd";
import { useEffect, useState } from "react";
import { StyledMenu } from "./style.tsx";
import { authItems, defaultItems } from "./items.tsx";

interface NavBarProps {
  isAuth: boolean;
  setIsAuth: (isAuthenticated: boolean) => void;
}

type ThemeType = "dark" | "light";

const NavBar: React.FC<NavBarProps> = ({ isAuth, setIsAuth }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(
    window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark",
  );

  const changeColorTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
  };

  const setInitialTheme = (theme: ThemeType) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  const toggleAuth = () => {
    setIsAuth(!isAuth);
  };

  const authButtonText = isAuth ? "Log out" : "Log in";

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
      key: "fakeAuth",
    },
  ];

  const items: MenuProps["items"] = [];
  items.push(...(defaultItems as []));
  if (isAuth) items.push(...(authItems as []));
  items.push(...actionItems);

  useEffect(() => {
    setInitialTheme(currentTheme);
  }, [currentTheme]);

  return <StyledMenu mode="horizontal" items={items} />;
};

export default NavBar;
