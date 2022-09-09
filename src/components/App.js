import "../styles/styles.css";
import Cadastro from "./Cadastro";
import Login from "./Login";
import Tela01 from "./Tela01";
import NovaSaida from "./NovaSaida.js";
import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NovaEntrada from "./NovaEntrada";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/" element={<Cadastro />} />
          <Route path="/FJG" element={<Tela01 />} />
          <Route path="/newIn" element={<NovaEntrada />} />
          <Route path="/newout" element={<NovaSaida />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
