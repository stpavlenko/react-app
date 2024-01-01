import { Link } from "react-router-dom";
import { PAGINATION_ROUTE, FORM_ROUTE, BULBASAUR_ROUTE, IVYSAUR_ROUTE } from "../../app/routes/config";
import type { MenuProps } from "antd";
import { Menu, Button } from "antd";

interface NavBarProps {
  isAuth: boolean;
  setIsAuth: (isAuthenticated: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ isAuth, setIsAuth }) => {
  const toggleAuth = () => {
    setIsAuth(!isAuth);
  };

  const authButtonText = isAuth ? "Выйти" : "Войти";

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
      label: <Button onClick={toggleAuth}>{authButtonText}</Button>,
      key: "Auth",
    },
  ];

  if (isAuth) items.push(...authItems);
  items.push(...actionItems);

  return <Menu mode="horizontal" items={items} />;
};

export default NavBar;
