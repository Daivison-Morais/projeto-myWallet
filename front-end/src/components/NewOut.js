import { TxtTop } from "./MainScreen";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "./UserContext";
import styled from "styled-components";
import BASE_URL from "./services";
import LoadSimbol from "./LoadSimbol";
import { Input } from "./NewIn";
import notify from "./cardNotify";

export default function NewOut() {
  const { token } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate();

  function handleForm(event) {
    event.preventDefault();

    if (!token) {
      notify("Você precisa estar logado para criar uma saída");
      return navigate("/");
    }

    setDisabledButton(true);

    const body = {
      value: value > 0 ? value * -1 : value,
      description: description,
    };

    if (body.description === "") body.description = "-";

    axios
      .post(`${BASE_URL}/newout`, body, config)
      .then((resposta) => {
        setDescription(resposta.data);
        navigate("/mainScreen");
        setDisabledButton(false);
      })
      .catch((error) => {
        setDisabledButton(false);
        if (error.response.data === undefined) {
          return notify("Tente novamnete mais tarde.");
        } else notify(error.response.data.error);
        navigate("/");
      });
  }

  return (
    <>
      <Container>
        <Top>
          <TxtTop>Nova Saída</TxtTop>
        </Top>
        <form onSubmit={handleForm}>
          <div>
            <Input
              placeholder="Descrição"
              type="text"
              autoFocus={true}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></Input>
          </div>

          <div>
            <Input
              placeholder="Valor"
              type="number"
              step="0.01"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              required
            ></Input>
          </div>

          <Button disabled={disabledButton} type="submit">
            {disabledButton ? <LoadSimbol /> : "Salvar Saída"}
          </Button>
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

export const Top = styled.div`
  margin-bottom: 20px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 93%;
  width: 93%;
`;
