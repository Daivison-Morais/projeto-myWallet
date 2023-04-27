import "../styles/styles.css";
import Cadastro from "./Cadastro";
import Login from "./Login";
import Tela01 from "./Tela01";
import NovaSaida from "./NovaSaida.js";
import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NovaEntrada from "./NovaEntrada";
import { useState } from "react";
import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState([]);
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider
          value={{
            token,
            setToken,
            user,
            setUser,
          }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/tela01" element={<Tela01 />} />
            <Route path="/newIn" element={<NovaEntrada />} />
            <Route path="/newout" element={<NovaSaida />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
