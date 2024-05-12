import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Pagination from "../../pages/Pagination";
import Form from "../../pages/Form";
import Pokemons from "../../pages/Pokemons";
import { PAGINATION_ROUTE, FORM_ROUTE, POKEMONS_ROUTE } from "./config";

const MainRouter = ({ isAuth = false }) => {
  const basedPath: RouteObject[] = [
    { path: PAGINATION_ROUTE, element: <Pagination /> },
    { path: POKEMONS_ROUTE, element: <Pokemons /> },
    { path: "*", element: <Navigate to={"/"} replace /> },
  ];

  const authPath: RouteObject[] = [{ path: FORM_ROUTE, element: <Form /> }];

  const resultPaths: RouteObject[] = basedPath;

  if (isAuth) {
    resultPaths.push(...authPath);
  }

  return useRoutes(resultPaths);
};

export default MainRouter;
