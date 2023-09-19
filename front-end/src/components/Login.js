import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import BASE_URL from "./services";
import LoadSimbol from "./LoadSimbol";
import { useMutation } from "react-query";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import notify from "./cardNotify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const { setToken, setRefreshToken, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ BASE_URL, body }) => {
      return await axios
        .post(`${BASE_URL}/sign-in`, body)
        .then((response) => {
          setRefreshToken(response.data.refreshToken._id);
          setToken(response.data.token);
          localStorage.setItem("refresh", response.data.refreshToken._id);
          localStorage.setItem("name", response.data.refreshToken.name);

          setUser(response.data.user);
          setDisabledButton(false);
          navigate("/mainScreen");
        })
        .catch((error) => {
          setDisabledButton(false);
          if (error.response.data === undefined) {
            return notify("Tente novamnete mais tarde.");
          }
          notify(error.response.data.error);
        });
    },
  });

  function handleForm(event) {
    event.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    setDisabledButton(true);

    mutation.mutate({ BASE_URL: BASE_URL, body: body });
  }

  function eyeReturn(eye) {
    return eye ? (
      <AiOutlineEyeInvisible
        onClick={() => {
          setEye(!eye);
        }}
        style={{
          position: "absolute",
          top: "37%",
          right: "13px",
          width: "24px",
          height: "24px",
          color: "#898989",
          cursor: "pointer",
        }}
      />
    ) : (
      <AiOutlineEye
        onClick={() => {
          setEye(!eye);
        }}
        style={{
          position: "absolute",
          top: "37%",
          right: "13px",
          width: "24px",
          height: "24px",
          color: "#898989",
          cursor: "pointer",
        }}
      />
    );
  }

  return (
    <>
      <Container>
        <Titulo>My Wallet</Titulo>
        <form onSubmit={handleForm}>
          <div>
            <Input
              placeholder="E-mail"
              type="email"
              value={email}
              autoFocus={true}
              onChange={(event) => setEmail(event.target.value)}
              required
            ></Input>
          </div>

          <BoxInput>
            <Input
              placeholder="Senha"
              type={eye ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            ></Input>
            {eyeReturn(eye)}
          </BoxInput>

          <Button disabled={disabledButton} type="submit">
            {disabledButton ? <LoadSimbol /> : "Entrar"}
          </Button>
        </form>
        <TxtCadastro onClick={() => navigate("/signUp")}>
          Primeira vez? Cadastre-se!
        </TxtCadastro>
      </Container>
    </>
  );
}

export const Titulo = styled.h1`
  font-family: "Saira Stencil One", cursive;
  height: 50px;
  width: 160px;
  font-size: 32px;
  margin-bottom: 45px;
  font-weight: 400;
  color: #ffffff;
`;

export const TxtCadastro = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: underline;
  color: #ffffff;
  cursor: pointer;
  line-height: 22.5px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85vw;
  max-width: 600px;
  height: 45px;
  background-color: #a328d6;
  border-radius: 5px;
  margin-bottom: 28px;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  box-sizing: border-box;
  cursor: pointer;
  border-style: hidden;
`;

export const Foto = styled.img`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

export const BoxInput = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 85vw;
  max-width: 600px;
  height: 56px;
  font-size: 20px;
  outline: none;
  margin: 8px 0;
  color: #262626;
  padding-left: 8px;
  border-radius: 5px;
  border-style: none;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
