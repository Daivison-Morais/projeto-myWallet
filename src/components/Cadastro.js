import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Input, TxtCadastro, Button } from "./Login";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [name, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [password, setSenha] = useState("");

  const navigate = useNavigate();

  function handleForm(event) {
    event.preventDefault();

    const body = {
      name: name,
      email: email,
      foto: foto,
      password: password,
    };

    axios
      .post("http://localhost:5000", body)
      .then((resposta) => {
        alert("Cadastro realizado!");
      })
      .catch((erro) => {
        alert("Algo deu errado");
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
              placeholder="Senha"
              type="password"
              onChange={(event) => setSenha(event.target.value)}
              value={password}
              required
            ></Input>
          </div>
          <div>
            <Input
              placeholder="Nome"
              type="text"
              value={name}
              onChange={(event) => setNome(event.target.value)}
              required
            ></Input>
          </div>
          <div>
            <Input
              placeholder="Foto"
              type="url"
              value={foto}
              onChange={(event) => setFoto(event.target.value)}
              required
            ></Input>
          </div>
          <Button type="submit">Cadastrar</Button>
          <TxtCadastro onClick={() => navigate("/sign-in")}>
            Já tem uma conta? Entre agora!
          </TxtCadastro>
        </form>
      </Container>
    </>
  );
}
