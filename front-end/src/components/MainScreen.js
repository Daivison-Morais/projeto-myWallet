import styled from "styled-components";
import mais from "../assets/img/mais.png";
import menos from "../assets/img/menos.png";
import { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./services";
import { GiHamburgerMenu } from "react-icons/gi";
import LoadSimbol from "./LoadSimbol";
import SideBar from "./SideBar";
import { useQuery } from "react-query";
import notify from "./cardNotify";

export default function MainScreen() {
  const { setToken, token, refreshToken, user } = useContext(UserContext);
  const [onSidebar, setOnsidebar] = useState(false);

  const navigate = useNavigate();

  if (!token) {
    setToken(localStorage.getItem("newRT"));
  }

  useEffect(() => {
    localStorage.setItem("random", refreshToken);

    axios
      .post(`${BASE_URL}/refresh-token`, {
        refreshToken: localStorage.getItem("random"),
      })
      .then((response) => {
        localStorage.setItem("newRT", response.data.token);
      })
      .catch((error) => {
        if (error.response.data === undefined) {
          return notify("Tente novamnete mais tarde.");
        } else notify(error.response.data.error);
        navigate("/");
      });
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${token || localStorage.getItem("newRT")}`,
    },
  };

  const { data, isLoading } = useQuery("Transactions", async () => {
    return await axios
      .get(`${BASE_URL}/transactions`, config)
      .then((response) => response.data.reverse())
      .catch((error) => {
        if (error.response.data === undefined) {
          return notify("Tente novamnete mais tarde.");
        }
        setToken(localStorage.getItem("newTR"));
        notify(error.response.data.error);
        navigate("/");
      });
  });

  if (isLoading) return <LoadSimbol />;

  let resultValue = 0;
  if (data?.[0] !== "none") {
    data?.map((saldo) => (resultValue += Number(saldo.value)));
  }

  function infoReLogin() {}

  return (
    <>
      <Container>
        {onSidebar ? (
          <>
            <SideBar
              setOnsidebar={setOnsidebar}
              onSidebar={onSidebar}
              data={data}
            />
            <Div
              onSidebar={onSidebar}
              onClick={() => {
                setOnsidebar(false);
              }}
            ></Div>
          </>
        ) : (
          ""
        )}
        <Top>
          <TxtTop>Olá, {user || localStorage.getItem("name")}</TxtTop>
          <GiHamburgerMenu
            style={{
              color: "white",
              fontSize: 30,
              cursor: "pointer",
              zIndex: 500,
            }}
            onClick={() => setOnsidebar(!onSidebar)}
          />
        </Top>
        <Main>
          {data?.[0] === "none" ? (
            <LoadSimbol />
          ) : data?.length !== 0 ? (
            data?.map((value) => (
              <BlocoAnotation key={value._id} value={value.in}>
                <Date>{value.date}</Date>
                <Description>{value.description}</Description>
                <Value>
                  {Number(value.value).toLocaleString("pt-BR", {
                    maximumFractionDigits: 2,
                  })}
                </Value>
              </BlocoAnotation>
            ))
          ) : (
            <div className="centraliza">
              <div className="txtInf">Não há registros de entrada ou saída</div>
            </div>
          )}
        </Main>
        <Saldo value={resultValue}>
          Saldo:{" "}
          {resultValue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          R$
        </Saldo>

        <Footer>
          <Buttons
            onClick={() => {
              token ? navigate("/newin") : infoReLogin();
            }}
          >
            <Img src={mais} alt="" />
            <TxtBotao>Nova entrada</TxtBotao>
          </Buttons>
          <Buttons
            onClick={() => {
              token ? navigate("/newout") : infoReLogin();
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

const Div = styled.div`
  position: absolute;
  width: 32%;
  height: 100%;
  top: 0px;
  right: 0px;
  z-index: ${({ onSidebar }) => (onSidebar ? "5" : "-2")};
`;

export const Saldo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 20px;
  min-height: 20px;
  padding: 15px 5px;
  margin-top: 6px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: ${({ value }) =>
    value === "true" || value >= 0 ? "#00B47A" : "#FF6666"};
  margin-bottom: 10px;
  background-color: #eff3f3;
`;

export const BlocoAnotation = styled.div`
  display: flex;
  min-height: 41px;
  justify-content: space-between;
  word-wrap: break-word;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  color: ${({ value }) =>
    value === "true" || value >= 0 ? "#00B47A" : "#FF6666"};
  border-radius: 5px;
  margin: 6px 4px;
  padding: 4px;
`;

export const Date = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  font-size: 18px;
  font-weight: 400;
`;

export const Value = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  text-align: center;
  margin-right: 5px;
  font-weight: 400;
`;
export const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  margin: 5px 10px;
  word-break: break-word;
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
  padding: 6px;
  overflow: scroll;
  overflow-x: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
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
  border-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #a328d6;
  border-radius: 5px;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 3vw;
  height: 100%;
  width: 100vw;
`;
