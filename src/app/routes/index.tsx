import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Pagination from "../../pages/Pagination";
import Bulbasaur from "../../pages/Bulbasaur";
import Ivysaur from "../../pages/Ivysaur";
import Pdf from "../../pages/Pdf";
import AuthForm from "../../pages/Auth";
import Pokemons from "../../pages/Pokemons";
import { PAGINATION_ROUTE, FORM_ROUTE, BULBASAUR_ROUTE, IVYSAUR_ROUTE, POKEMONS_ROUTE, AUTH_ROUTE } from "./config";

const MainRouter = ({ isAuth = false }) => {
  const basedPath: RouteObject[] = [
    { path: PAGINATION_ROUTE, element: <Pagination /> },
    { path: BULBASAUR_ROUTE, element: <Bulbasaur /> },
    { path: IVYSAUR_ROUTE, element: <Ivysaur /> },
    { path: POKEMONS_ROUTE, element: <Pokemons /> },
    { path: FORM_ROUTE, element: <Pdf /> },
    { path: "*", element: <Navigate to={"/"} replace /> },
  ];

  const authPath: RouteObject[] = [
    { path: AUTH_ROUTE, element: <AuthForm /> },
  ];

  const resultPaths: RouteObject[] = basedPath;

  if (isAuth) {
    resultPaths.push(...authPath);
  }

  return useRoutes(resultPaths);
};

export default MainRouter;
