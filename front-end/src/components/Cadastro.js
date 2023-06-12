import axios from "axios";
import { useState } from "react";
import BASE_URL from "./services";

import { useNavigate } from "react-router-dom";

import { Container, Input, TxtCadastro, Button } from "./Login";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setSenha] = useState("");

  const navigate = useNavigate();

  function handleForm(event) {
    event.preventDefault();

    const body = {
      name: name,
      email: email,
      confirmPassword: confirmPassword,
      password: password,
    };

    axios
      .post(
        `${BASE_URL}/sign-up`, body)
      .then((resposta) => {
        alert("Cadastro realizado!");
        navigate("/");
      })
      .catch((error) => {
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
          <Button type="submit">Cadastrar</Button>
          <TxtCadastro onClick={() => navigate("/")}>
            Já tem uma conta? Entre agora!
          </TxtCadastro>
        </form>
      </Container>
    </>
  );
}
