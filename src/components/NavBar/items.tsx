import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  BULBASAUR_ROUTE,
  FORM_ROUTE,
  IVYSAUR_ROUTE,
  PAGINATION_ROUTE,
  POKEMONS_ROUTE,
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
];

export const authItems: MenuProps["items"] = [
  {
    label: <Link to={FORM_ROUTE}>Form</Link>,
    key: "Form",
  },
];


