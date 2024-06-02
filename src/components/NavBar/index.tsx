import { Button, MenuProps } from "antd";
import { Switch } from "antd";
import { useContext, useEffect, useState } from "react";
import { StyledMenu } from "./style.tsx";
import { defaultItems } from "./items.tsx";
import { AuthContext } from "../../providers/AuthProvider";
import authInstance from "../../helpers/axios";
import { useNavigate } from "react-router-dom";

type ThemeType = "dark" | "light";

const NavBar: React.FC = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(
    window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark",
  );

  const logout = async () => {
    try {
      const response = await authInstance.post("auth/logout/");
      if (response.status === 200) {
        localStorage.removeItem("access_token");
        setIsAuth(false);
        navigate("/auth");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const changeColorTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
  };

  const setInitialTheme = (theme: ThemeType) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

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
  ];

  const authItems: MenuProps["items"] = [
    {
      label: <Button onClick={logout}>Log out</Button>,
      key: "logOut",
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
