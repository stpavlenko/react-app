import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  BULBASAUR_ROUTE,
  IVYSAUR_ROUTE,
  PAGINATION_ROUTE,
  POKEMONS_ROUTE,
  AUTH_ROUTE, PDF_ROUTE,
} from "../../app/routes/config.ts";

export const defaultItems: MenuProps["items"] = [
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
  {
    label: <Link to={POKEMONS_ROUTE}>Pokemons</Link>,
    key: "pokemons",
  },
  {
    label: <Link to={AUTH_ROUTE}>Login</Link>,
    key: "auth",
  },
  {
    label: <Link to={PDF_ROUTE}>Pdf</Link>,
    key: "Pdf",
  },
];
