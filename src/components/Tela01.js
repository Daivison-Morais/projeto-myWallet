import styled from "styled-components";
import enter from "../assets/img/enter.png";
import mais from "../assets/img/mais.png";
import menos from "../assets/img/menos.png";

export default function Tela01() {
  return (
    <>
      <Container>
        <Topo>
          <TxtTopo>Olá, fulano</TxtTopo>
          <span>
            <img src={enter} alt="buttster" />
          </span>
        </Topo>
        <Main>
          <div className="centraliza">
            <div className="txtInf">Não há registros de entrada ou saída</div>
          </div>
        </Main>
        <Footer>
          <Buttons>
            <Img src={mais} alt="" />
            <TxtBotao>Nova entrada</TxtBotao>
          </Buttons>
          <Buttons>
            <Img src={menos} alt="" />
            <TxtBotao>Nova saída</TxtBotao>
          </Buttons>
        </Footer>
      </Container>
    </>
  );
}

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
  width: 100%;
  height: 67%;
  border-radius: 5px;
  padding-left: 6px;
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
