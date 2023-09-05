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

  console.log(data)

  const mutation = useMutation({
    mutationFn: ({ BASE_URL, config }) => {
      return axios.delete(`${BASE_URL}/delete/all`, config);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      setClick(false);
      setOnsidebar(!onSidebar);
      queryClient.invalidateQueries("Transactions");
    },
  });

  return (
    <>
      <Container>
        <TopicSidebar onClick={() => setClick(!click)}>
          <TextSidebar>Apagar tudo</TextSidebar>
          <RiDeleteBin2Line
            style={{ color: "white", fontSize: 30, cursor: "pointer" }}
          />
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
          <TextSidebar>Sair</TextSidebar>
          <FiLogOut
            style={{ color: "white", fontSize: 30, cursor: "pointer" }}
          />
        </TopicSidebar>

        <TopicSidebar onClick={()=>{setOpenReport(!openReport) }}>
          <TextSidebar>Relatório</TextSidebar><TbReportSearch 
          style={{ color: "white", fontSize: 30, cursor: "pointer" }}/>
        </TopicSidebar>
        <ReportContainer openReport={openReport}>
            <TopicReport>Valor total gasto: </TopicReport>
            <TopicReport>Total de saídas: </TopicReport>
            <TopicReport>Maior valor de entrada</TopicReport>
            <TopicReport>Total de entradas: </TopicReport>
            <TopicReport>Maior valor de saída: </TopicReport>
          </ReportContainer>
      </Container>
    </>
  );
}

const TopicReport = styled.div`
padding: 4px;
  color: white;
`;

const ReportContainer = styled.div`
display: ${({openReport}) => openReport? "display" : "none"};
`;

export const ConfirmationBox = styled.div`
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

const TextSidebar = styled.div``;

const TopicSidebar = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  margin: 5px;
  background-color: #8510b5;
  cursor: pointer;
  border-radius: 8px;
  padding: 7px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 66%;
  height: 98vh;
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
