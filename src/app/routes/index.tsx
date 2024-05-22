import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Pagination from "../../pages/Pagination";
import Bulbasaur from "../../pages/Bulbasaur";
import Ivysaur from "../../pages/Ivysaur";
import Pdf from "../../pages/Pdf";
import Pokemons from "../../pages/Pokemons";
import Auth from "../../pages/Auth";
import { PAGINATION_ROUTE, PDF_ROUTE, BULBASAUR_ROUTE, IVYSAUR_ROUTE, POKEMONS_ROUTE, AUTH_ROUTE } from "./config";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MainRouter = () => {
  const { isAuth } = useContext(AuthContext);
  const basedPath: RouteObject[] = [
    { path: PAGINATION_ROUTE, element: <Pagination /> },
    { path: BULBASAUR_ROUTE, element: <Bulbasaur /> },
    { path: IVYSAUR_ROUTE, element: <Ivysaur /> },
    { path: POKEMONS_ROUTE, element: <Pokemons /> },
    { path: AUTH_ROUTE, element: <Auth /> },
    { path: "*", element: <Navigate to={"/"} replace /> },
  ];

  const authPath: RouteObject[] = [{ path: PDF_ROUTE, element: <Pdf /> }];

  const resultPaths: RouteObject[] = basedPath;

  if (isAuth) {
    resultPaths.push(...authPath);
  }

  return useRoutes(resultPaths);
};

export default MainRouter;
