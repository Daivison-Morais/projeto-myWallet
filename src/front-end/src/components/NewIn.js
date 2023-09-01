import { TxtTop } from "./MainScreen";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "./UserContext";
import styled from "styled-components";
import BASE_URL from "./services";

export default function NewIn() {
  const { token } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const navigate = useNavigate();

  function handleForm(event) {
    event.preventDefault();

    if (!token) {
      alert("Você precisa estar logado para criar uma saída");
      return navigate("/");
    }

    setDisabledButton(true);

    const body = {
      value: value,
      descricao: description,
    };
    axios
      .post(`${BASE_URL}/newin`, body, config)
      .then((response) => {
        setDescription(response.data);
        setDisabledButton(false);
        navigate("/mainScreen");
      })
      .catch((error) => {
        setDisabledButton(false);
        alert(error.response.data);
      });
  }

  return (
    <>
      <Container>
        <Top>
          <TxtTop>Nova entrada</TxtTop>
        </Top>
        <form onSubmit={handleForm}>
          <div>
            <Input
              placeholder="Descrição"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            ></Input>
          </div>

          <div>
            <Input
              placeholder="Valor"
              type="number"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              required
            ></Input>
          </div>

          <Button disabled={disabledButton} type="submit">
            Salvar entrada
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

export const Input = styled.input`
  width: 100%;
  height: 58px;
  margin-bottom: 13px;
  font-size: 20px;
  color: #262626;
  padding-left: 8px;
  border-radius: 5px;
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
