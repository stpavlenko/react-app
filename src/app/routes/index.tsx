import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Pagination from "../../pages/Pagination";
import Bulbasaur from "../../pages/Bulbasaur";
import Ivysaur from "../../pages/Ivysaur";
import Form from "../../pages/Form";
import { PAGINATION_ROUTE, FORM_ROUTE, BULBASAUR_ROUTE, IVYSAUR_ROUTE } from "./config";

const MainRouter = ({ isAuth = false }) => {
  const basedPath: RouteObject[] = [
    { path: PAGINATION_ROUTE, element: <Pagination /> },
    { path: BULBASAUR_ROUTE, element: <Bulbasaur /> },
    { path: IVYSAUR_ROUTE, element: <Ivysaur /> },
    { path: "*", element: <Navigate to={"/"} replace /> },
  ];
  
  const authPath: RouteObject[] = [
    { path: FORM_ROUTE, element: <Form /> },
  ];

  const resultPaths: RouteObject[] = basedPath;

  if (isAuth) {
    resultPaths.push(...authPath);
  }

  return useRoutes(resultPaths);
};

export default MainRouter;
