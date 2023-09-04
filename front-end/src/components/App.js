import "../styles/styles.css";
import SignUp from "./SignUp";
import Login from "./Login";
import MainScreen from "./MainScreen";
import NewOut from "./NewOut.js";
import GlobalStyle from "../styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewIn from "./NewIn";
import { useState } from "react";
import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

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
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/mainScreen" element={<MainScreen />} />
            <Route path="/newIn" element={<NewIn />} />
            <Route path="/newout" element={<NewOut />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
