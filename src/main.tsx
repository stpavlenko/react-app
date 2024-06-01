import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./global-styles.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/react-app">
    <GlobalStyles />
    <App />
  </BrowserRouter>,
);
