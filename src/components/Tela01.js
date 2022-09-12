import styled from "styled-components";
import enter from "../assets/img/enter.png";
import mais from "../assets/img/mais.png";
import menos from "../assets/img/menos.png";
import { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Tela01() {
  const [inOut, setInOut] = useState([]);
  const { token, user } = useContext(UserContext);

  const config = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/transactions", config).then((resp) => {
      setInOut(resp.data);
    });
  }, []);

  return (
    <>
      <Container>
        <Topo>
          <TxtTopo>Olá, {user}</TxtTopo>
          <span onClick={() => navigate("/")}>
            <img src={enter} alt="buttster" />
          </span>
        </Topo>
        <Main>
          {inOut.length !== 0 ? (
            inOut.map((value) => (
              <BlocoAnotacao>
                <Date>{value.date}</Date>
                <Descricao>{value.descricao}</Descricao>
                <Value>
                  {value.in === "true" ? (
                    <CorVerde>{value.value}</CorVerde>
                  ) : (
                    <CorVermelho>{value.value}</CorVermelho>
                  )}
                </Value>
              </BlocoAnotacao>
            ))
          ) : (
            <div className="centraliza">
              <div className="txtInf">Não há registros de entrada ou saída</div>
            </div>
          )}
          {/* <Saldo>Saldo: {}</Saldo> */}
        </Main>

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

/* export const Saldo = styled.div`
  position: absolute;
  
`;
 */
export const CorVerde = styled.div`
  color: green;
`;

export const CorVermelho = styled.div`
  color: red;
`;

export const BlocoAnotacao = styled.div`
  display: flex;
  min-height: 45px;
  justify-content: space-around;
  word-wrap: break-word;
`;

export const Value = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
`;
export const Descricao = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  word-break: break-word;
  width: 230px;
  font-size: 18px;
  font-weight: 400;
`;
export const Date = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
`;

export const TxtBotao = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
`;

export const Img = styled.img`
  width: 22%;
`;

export const TxtTopo = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: white;
`;

export const Topo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Main = styled.div`
  position: relative;
  width: 100%;
  height: 67%;
  border-radius: 5px;
  padding-left: 6px;
  overflow: scroll;
  background-color: #ffffff;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 43vw;
  height: 20vh;
  padding-left: 10px;
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
