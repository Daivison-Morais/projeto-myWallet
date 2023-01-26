import { TxtTopo } from "./Tela01";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "./UserContext";

import styled from "styled-components";

export default function NovaSaida() {
  const { token } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [descricao, setDescricao] = useState("");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const navigate = useNavigate();

  function handleForm(event) {
    event.preventDefault();

    const body = {
      value: value > 0 ? value * -1 : value,
      descricao: descricao,
    };

    axios
      .post("http://localhost:5000/newout", body, config)
      .then((resposta) => {
        setDescricao(resposta.data);
        navigate("/tela01");
      })
      .catch((erro) => {
        alert(erro.response.data.error);
      });
  }

  return (
    <>
      <Container>
        <Topo>
          <TxtTopo>Nova Saída</TxtTopo>
        </Topo>
        <form onSubmit={handleForm}>
          <div>
            <Input
              placeholder="Valor"
              type="number"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              required
            ></Input>
          </div>

          <div>
            <Input
              placeholder="Descrição"
              type="text"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              required
            ></Input>
          </div>

          <Button type="submit">Salvar Saída</Button>
        </form>
      </Container>
    </>
  );
}

export const Button = styled.button`
  width: 100%;
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

export const Input = styled.input`
  width: 100%;
  height: 58px;
  margin-bottom: 13px;
  font-size: 20px;
  color: #262626;
  padding-left: 8px;
  border-radius: 5px;
`;

export const Topo = styled.div`
  margin-bottom: 20px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 93%;
  width: 93%;
`;
