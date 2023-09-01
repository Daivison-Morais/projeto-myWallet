import axios from "axios";
import { useState } from "react";
import BASE_URL from "./services";

import { useNavigate } from "react-router-dom";

import { Container, Input, TxtCadastro, Button } from "./Login";
import styled from "styled-components";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setSenha] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  const navigate = useNavigate();

  function handleForm(event) {
    event.preventDefault();

    setDisabledButton(true);

    const body = {
      name: name,
      email: email,
      confirmPassword: confirmPassword,
      password: password,
    };

    axios
      .post(`${BASE_URL}/sign-up`, body)
      .then((resposta) => {
        alert("Cadastro realizado!");
        setDisabledButton(false);
        navigate("/");
      })
      .catch((error) => {
        setDisabledButton(false);
        alert(error.response.data.error);
      });
  }

  return (
    <>
      <Container>
        <form onSubmit={handleForm}>
          <div>
            <Input
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            ></Input>
          </div>

          <div>
            <Input
              placeholder="Nome"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            ></Input>
          </div>

          <div>
            <Input
              placeholder="Senha"
              type="password"
              onChange={(event) => setSenha(event.target.value)}
              value={password}
              required
            ></Input>
          </div>

          <div>
            <Input
              placeholder="Confirme a senha"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            ></Input>
          </div>
          <Button disabled={disabledButton} type="submit">
            Cadastrar
          </Button>
          <TxtCadastro onClick={() => navigate("/")}>
            Já tem uma conta? Entre agora!
          </TxtCadastro>
        </form>
      </Container>
    </>
  );
}

export const Foto = styled(Button)`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
