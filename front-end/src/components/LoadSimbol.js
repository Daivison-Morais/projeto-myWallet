import styled from "styled-components";

export default function LoadSimbol({size}) {
  return (
    <>
    <Center>
      <LoadSimboll size={size}></LoadSimboll>
    </Center>
    </>
  );
}

export const Center = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
`;

export const LoadSimboll = styled.div`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  width: ${({size})=> size ? size : "30px"};
  height: ${({size})=> size ? size : "30px"};
  border: 5px solid;
  border-color: #e6e6e6 #8c11be #8c11be;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;
