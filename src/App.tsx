import "./App.css";
import MainRouter from "./app/routes/index";
import NavBar from "./components/NavBar";
import { useState } from "react";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth}></NavBar>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth}></NavBar>
      <MainRouter isAuth={isAuth} />
    </>
  );
};

export default App;
