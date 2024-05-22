import MainRouter from "./app/routes/index";
import NavBar from "./components/NavBar";
import { useContext, useEffect } from "react";
import authInstance from "./helpers/axios";
import { AuthContext } from "./providers/AuthProvider";
import Auth from "./pages/Auth";

const App = () => {
  const { isAuth } = useContext(AuthContext);

  const getUsers = async () => {
    await authInstance.get("users/current/");
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (!isAuth) return <Auth />;
  return (
    <>
      <NavBar />
      <MainRouter />
    </>
  );
};

export default App;
