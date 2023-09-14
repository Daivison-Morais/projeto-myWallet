import { useContext, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";

import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import BASE_URL from "./services";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function SideBar({ setOnsidebar, onSidebar, data }) {
  const { token, setToken } = useContext(UserContext);
  const [click, setClick] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  let totalIn = 0;
  let totalOut = 0;
  let higherEntryValue = 0;
  let higherOutputValue = 0;
  let saldo = 0;

  const mutation = useMutation({
    mutationFn: ({ BASE_URL, config }) => {
      return axios.delete(`${BASE_URL}/delete/all`, config);
    },
    onError: (error) => {
      if (error.response.data === undefined) {
        return alert("Tente novamnete mais tarde.");
      } else alert(error.response.data.error);
      navigate("/");
    },
    onSuccess: () => {
      setClick(false);
      setOnsidebar(!onSidebar);
      queryClient.invalidateQueries("Transactions");
    },
  });

  const balanceMonth = data.reduce((acc, value) => {
    saldo += Number(value.value.toLocaleString("pt-BR"));
    if (value.in === "true") {
      totalIn += Number(value.value);
      if (Number(value.value) > higherEntryValue)
        higherEntryValue = Number(value.value);
    } else {
      totalOut += Number(value.value);
      if (value.value < higherOutputValue) higherOutputValue = value.value;
    }

    const month = value.date[3] + value.date[4];
    acc[month] =
      Number(acc[month]) + Number(value.value) || Number(value.value);
    return acc;
  }, {});

  const monthTranslator = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    "10": "Outubro",
    "11": "Novenbro",
    "12": "Dezembro",
  };

  let highestBalanceMonth = Number.NEGATIVE_INFINITY;
  let lowestBalanceMonth = Number.POSITIVE_INFINITY;
  let highMonth = 0;
  let lowMonth = 0;
  const listMonth = [];

  for (let item in balanceMonth) {
    if (balanceMonth[item] > highestBalanceMonth) {
      highestBalanceMonth = balanceMonth[item];
      highMonth = monthTranslator[item];
    }
    if (balanceMonth[item] < lowestBalanceMonth) {
      lowestBalanceMonth = balanceMonth[item];
      lowMonth = monthTranslator[item];
    }
    listMonth.push({
      mounth: monthTranslator[item],
      balance: balanceMonth[item],
    });
  }

  return (
    <>
      <Container>
        <TopicSidebar onClick={() => setClick(!click)}>
          <Justify>
            <TextSidebar>Apagar tudo</TextSidebar>
            <RiDeleteBin2Line
              style={{ color: "white", fontSize: 30, cursor: "pointer" }}
            />
          </Justify>

          {click ? (
            <ConfirmationBox>
              <TextBox>Apagar todos os dados?</TextBox>
              <Span>
                <BoxButtons
                  onClick={() => {
                    mutation.mutate({ BASE_URL: BASE_URL, config: config });
                  }}
                >
                  Sim
                </BoxButtons>
                <BoxButtons
                  onClick={() => {
                    setClick(false);
                  }}
                >
                  Não
                </BoxButtons>
              </Span>
            </ConfirmationBox>
          ) : (
            ""
          )}
        </TopicSidebar>

        <TopicSidebar
          onClick={() => {
            setToken("");
            navigate("/");
          }}
        >
          <Justify>
            <TextSidebar>Sair</TextSidebar>
            <FiLogOut
              style={{ color: "white", fontSize: 30, cursor: "pointer" }}
            />
          </Justify>
        </TopicSidebar>

        <TopicSidebar
          onClick={() => {
            setOpenReport(!openReport);
          }}
        >
          <Justify>
            <TextSidebar>Relatório</TextSidebar>
            <TbReportSearch
              style={{ color: "white", fontSize: 30, cursor: "pointer" }}
            />
          </Justify>
          {openReport ? (
            <ReportContainer openReport={openReport}>
              <Center>
                <TextSidebar>Geral</TextSidebar>
                <Line></Line>
              </Center>
              <TopicReport>
                <TextSidebar>Total em saídas: </TextSidebar>
                <Value>{totalOut.toLocaleString("pt-BR")}</Value>
              </TopicReport>
              <TopicReport>
                <TextSidebar>Total em entradas: </TextSidebar>{" "}
                {totalIn.toLocaleString("pt-BR")}
              </TopicReport>
              <TopicReport>
                <TextSidebar>Maior valor de entrada: </TextSidebar>{" "}
                <Value>{higherEntryValue.toLocaleString("pt-BR")}</Value>
              </TopicReport>
              <TopicReport>
                <TextSidebar>Maior valor de saída: </TextSidebar>
                <Value>{higherOutputValue.toLocaleString("pt-BR")}</Value>
              </TopicReport>
              <TopicReport>
                <TextSidebar>Saldo Atual: </TextSidebar>
                <Value>{saldo.toLocaleString("pt-BR")}</Value>
              </TopicReport>

              <Center>
                <TextSidebar>Por Mês</TextSidebar>
                <Line></Line>
              </Center>
              <TopicReport>
                <TextSidebar>Maior Saldo: </TextSidebar>
                <Value>{highMonth}</Value>
              </TopicReport>
              <TopicReport>
                <TextSidebar>Menor saldo: </TextSidebar>
                <Value>{lowMonth}</Value>
              </TopicReport>
              
              <Center>
                <TextSidebar>Entrada - saída por Mês</TextSidebar>
                <Line></Line>
              </Center>
              {listMonth.map(({ mounth, balance }, index) => {
                return (
                  <TopicReport key={index}>
                    <TextSidebar>{mounth} </TextSidebar>
                    <Value>{balance}</Value>
                  </TopicReport>
                );
              })}
              <Center>
                <TextSidebar>Saldo por Mês</TextSidebar>
                <Line></Line>
              </Center>
              {listMonth.map(({ mounth, balance }, index) => {
                let previousBalances = 0;
                for (let i = index + 1; i <= listMonth.length - 1; i++) {
                  previousBalances += Number(listMonth[i].balance);
                }
                return (
                  <TopicReport key={index}>
                    <TextSidebar>{mounth} </TextSidebar>
                    <Value>{balance + previousBalances}</Value>
                  </TopicReport>
                );
              })}
            </ReportContainer>
          ) : (
            ""
          )}
        </TopicSidebar>
      </Container>
    </>
  );
}

const Line = styled.div`
  width: 100%;
  border: 1px solid white;
  margin: 2px 0;
  border-bottom: 1px;
`;

const Center = styled.div`
  display: flex;
  width: 100%;
  margin: 4px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextSidebar = styled.div``;
const Value = styled.div``;

const TopicReport = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 4px 2px;
  color: white;
  font-size: 15px;
`;

const ReportContainer = styled.div`
  display: ${({ openReport }) => (openReport ? "flex" : "none")};
  flex-direction: column;
  background-color: #a328d6;

  margin-top: 7px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #a328d6;
  border-radius: 5px;
  padding: 9px;
`;

export const ConfirmationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 250px;
  min-width: 128px;
  padding: 5px;
  margin: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  background-color: #a328d6;
  border-radius: 5px;
`;

export const Span = styled.div`
  display: flex;
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

const Justify = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const TopicSidebar = styled.div`
  color: white;
  display: flex;
  min-height: 44px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  background-color: #8510b5;
  cursor: pointer;
  border-radius: 8px;
  padding: 7px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 70%;
  height: 98%;
  background-color: #a328d6;
  border: 1px solid white;
  max-width: 300px;
  border-radius: 8px;
  padding: 6px;
  top: 5px;
  left: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 5;
`;
