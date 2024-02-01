import "./App.css";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { Route, Routes } from "react-router-dom";
import { login, sidebar } from "./app/constants/ApplicationRoutes";
import Login from "./app/components/account/Login";
import Navbar from "./app/components/adminComponents/Navbar";
import NotFound from "./app/components/account/NotFound";

function App() {
  const token = localStorage.getItem("token");
  return (
    <FluentProvider theme={teamsLightTheme}>
      <Routes>
        <Route path={login} element={<Login />} />
        {token && <Route path={sidebar} element={<Navbar />} />}
      </Routes>
    </FluentProvider>
  );
}

export default App;
