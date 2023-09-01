import styled from "styled-components";
import mais from "../assets/img/mais.png";
import menos from "../assets/img/menos.png";
import { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./services";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function MainScreen() {
  const [inOut, setInOut] = useState([]);
  const { token, user } = useContext(UserContext);
  let [click, setClick] = useState(false);
  let [refresh, setRefresh] = useState(false);
  const arr = [...inOut];

  const config = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/transactions`, config).then((resp) => {
      setInOut(resp.data);
    });
  }, [refresh]);

  let resultValue = 0;
  inOut.map((saldo) => (resultValue = resultValue + Number(saldo.value)));

  async function deleteRequest() {
    if (!token) {
      alert("Você precisa estar logado para criar uma saída");
      return navigate("/");
    }
    await axios
      .delete(`${BASE_URL}/delete/all`, config)
      .then((resp) => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
    setClick((click = false));
  }

  return (
    <>
      <Container>
        <Top>
          <TxtTop>Olá, {user}</TxtTop>
          <RiDeleteBin2Line
            style={{ color: "white", fontSize: 30, cursor: "pointer" }}
            onClick={() => setClick(!click)}
          />
        </Top>
        <Main>
          {click ? (
            <Box>
              <TextBox>Apagar todos os dados?</TextBox>
              <Span>
                <BoxButtons
                  onClick={async () => {
                    deleteRequest();
                  }}
                >
                  Sim
                </BoxButtons>
                <BoxButtons
                  onClick={() => {
                    setClick((click = false));
                  }}
                >
                  Não
                </BoxButtons>
              </Span>
            </Box>
          ) : (
            ""
          )}

          {arr.length !== 0 ? (
            arr.reverse().map((value) => (
              <BlocoAnotation>
                <Date>{value.date}</Date>
                <Description>{value.descricao}</Description>
                <Value>
                  {value.in === "true" ? (
                    <CorVerde>{value.value}</CorVerde>
                  ) : (
                    <CorVermelho>{value.value}</CorVermelho>
                  )}
                </Value>
              </BlocoAnotation>
            ))
          ) : (
            <div className="centraliza">
              <div className="txtInf">Não há registros de entrada ou saída</div>
            </div>
          )}
        </Main>
        <Saldo>
          {" "}
          Saldo:{" "}
          {resultValue >= 0 ? (
            <CorVerde>{resultValue} R$</CorVerde>
          ) : (
            <CorVermelho>{resultValue} R$</CorVermelho>
          )}
        </Saldo>

        <Footer>
          <Buttons
            onClick={() => {
              navigate("/newin");
            }}
          >
            <Img src={mais} alt="" />
            <TxtBotao>Nova entrada</TxtBotao>
          </Buttons>
          <Buttons
            onClick={() => {
              navigate("/newout");
            }}
          >
            <Img src={menos} alt="" />
            <TxtBotao>Nova saída</TxtBotao>
          </Buttons>
        </Footer>
      </Container>
    </>
  );
}

export const Saldo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
  font-size: 20px;
  height: 20px;
  padding: 15px 5px;
  margin-top: 6px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  background-color: #eff3f3;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 0px;
  right: 0;
  width: 40vw;
  max-width: 250px;
  min-width: 128px;
  padding: 5px;
  margin: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  background-color: #a328d6;
  border-radius: 5px;
  z-index: 3;
`;

export const TextBox = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  color: white;
  margin: 5px;
  font-weight: 600;
`;

export const Span = styled.div`
  display: flex;
`;

export const BoxButtons = styled.span`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 16vw;
  max-width: 50px;
  height: 7vh;
  margin: 5px;
  color: white;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #8c11be;
  border-radius: 5px;
`;

export const CorVerde = styled.div`
  color: green;
  margin-left: 7px;
`;

export const CorVermelho = styled.div`
  color: red;
  margin-left: 7px;
`;

export const BlocoAnotation = styled.div`
  display: flex;
  min-height: 45px;
  justify-content: space-between;
  word-wrap: break-word;
`;

export const Date = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  font-size: 18px;
  font-weight: 400;
`;

export const Value = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  font-size: 18px;
  text-align: center;
  font-weight: 400;
`;
export const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  width: 50%;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  padding: 0 5px 0 10px;
`;

export const TxtBotao = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
`;

export const Img = styled.img`
  width: 18%;
`;

export const TxtTop = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: white;
`;

export const Top = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const Main = styled.div`
  position: relative;
  width: 100%;
  height: 67%;
  border-radius: 5px;
  padding-left: 6px;
  padding-right: 6px;
  overflow: scroll;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #eff3f3;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Buttons = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 43vw;
  height: 20vh;
  padding-left: 10px;
  cursor: pointer;
  border-width: 1px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #a328d6;
  border-radius: 5px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 93%;
  width: 93%;
`;
