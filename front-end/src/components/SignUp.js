import axios from "axios";
import { useState } from "react";
import BASE_URL from "./services";
import { useNavigate } from "react-router-dom";
import { Container, Input, TxtCadastro, Button, BoxInput } from "./Login";
import styled from "styled-components";
import LoadSimbol from "./LoadSimbol";
import { useMutation } from "react-query";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import notify from "./cardNotify";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [eyePass, setEyePass] = useState(false);
  const [eyeConfir, setEyeConfir] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setSenha] = useState("");

  const [disabledButton, setDisabledButton] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ BASE_URL, body }) => {
      return axios
        .post(`${BASE_URL}/sign-up`, body)
        .then(() => {
          notify("Cadastro realizado!");
          setDisabledButton(false);
          navigate("/");
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

    setDisabledButton(true);

    if (password !== confirmPassword) {
      setDisabledButton(false);
      return notify("Senhas não conferem!");
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      setDisabledButton(false);
      return notify("Senha deve ter mais que 6 caracteres");
    }

    const body = {
      name,
      email,
      confirmPassword,
      password,
    };

    mutation.mutate({ BASE_URL: BASE_URL, body: body });
  }

  function eyeReturn(eye, setEye) {
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

          <BoxInput>
            <Input
              placeholder="Senha"
              type={eyePass ? "text" : "password"}
              onChange={(event) => setSenha(event.target.value)}
              value={password}
              required
            ></Input>
            {eyeReturn(eyePass, setEyePass)}
          </BoxInput>

          <BoxInput>
            <Input
              placeholder="Confirme a senha"
              type={eyeConfir ? "text" : "password"}
              onChange={(event) => setConfirmPassword(event.target.value)}
              value={confirmPassword}
              required
            ></Input>
            {eyeReturn(eyeConfir, setEyeConfir)}
          </BoxInput>

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
