import axios from "axios";
import { useState } from "react";
import BASE_URL from "./services";
import { useNavigate } from "react-router-dom";
import { Container, Input, TxtCadastro, Button } from "./Login";
import styled from "styled-components";
import LoadSimbol from "./LoadSimbol";
import { useMutation } from "react-query";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setSenha] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn:  ({ BASE_URL, body }) => {
      return axios
        .post(`${BASE_URL}/sign-up`, body)
        .then(() => {
          alert("Cadastro realizado!")
          setDisabledButton(false);
          navigate("/");
        })
        .catch((error) => {
          setDisabledButton(false);
          if(error.response.data === undefined){
            return alert("Tente novamnete mais tarde.")
          }
          alert(error.response.data.error);
          navigate("/")
        });
    },
  });

  function handleForm(event) {
    event.preventDefault();

    setDisabledButton(true);

    if (password !== confirmPassword) {
      setDisabledButton(false);
      return alert("Senhas não conferem!");
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      setDisabledButton(false);
      return alert("Senha deve ter mais que 6 caracteres");
    }

    const body = {
      name: name,
      email: email,
      confirmPassword: confirmPassword,
      password: password,
    };

    mutation.mutate({ BASE_URL: BASE_URL, body: body });
  }

  return (
    <>
      <Container>
        <form onSubmit={handleForm}>
          <div>
            <Input
              placeholder="Nome"
              type="text"
              value={name}
              autoFocus={true}
              onChange={(event) => setName(event.target.value)}
              required
            ></Input>
          </div>

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
              placeholder="Confirme a senha"
              type="password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              value={confirmPassword}
              required
            ></Input>
          </div>
          <Button disabled={disabledButton} type="submit">
            {disabledButton ? <LoadSimbol /> : "Cadastrar"}
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

