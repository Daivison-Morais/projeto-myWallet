import styled from "styled-components";
import enter from "../assets/img/enter.png";
import mais from "../assets/img/mais.png";
import menos from "../assets/img/menos.png";
import { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./services";

export default function Tela01() {
  const [inOut, setInOut] = useState([]);
  const { token, user } = useContext(UserContext);

  const config = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${BASE_URL}/transactions`, config).then((resp) => {
      setInOut(resp.data);
    });
  }, []);
  inOut.reverse();
  let resultValue = 0;
  inOut.map((saldo) => (resultValue = resultValue + Number(saldo.value)));
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
        <Saldo> Saldo: {resultValue >= 0 ? <CorVerde>{resultValue} R$</CorVerde> 
        : <CorVermelho>{resultValue} R$</CorVermelho>
        }</Saldo>

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
  margin-bottom: 10px;
  background-color: #eff3f3;
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

export const TxtTopo = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: white;
`;

export const Topo = styled.div`
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
  background-color: #eff3f3;
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
  cursor: pointer;
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
