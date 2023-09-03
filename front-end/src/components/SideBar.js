import { useState } from "react";
import styled from "styled-components";

export default function SideBar() {
  return (
    <>
      <Container>
        <TopicSidebar>Apagar tudo</TopicSidebar>
        <TopicSidebar>Sair</TopicSidebar>
      </Container>
    </>
  );
}

const TopicSidebar = styled.div`
    color: white;
`;

const Container = styled.div`
position: absolute;
width: 66%;
height: 98vh;
background-color: #a328d6;
border: 1px solid white;
max-width: 300px;
border-radius: 8px;
padding: 6px;
top: 5px;
left: 5px;
z-index: 5;
`;