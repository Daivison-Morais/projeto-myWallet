import { TxtTopo } from "./Tela01";

import styled from "styled-components";
export default function NovaEntrada() {
  return (
    <>
      <Container>
        <Topo>
          <TxtTopo>Nova entrada</TxtTopo>
        </Topo>
        <form /* onSubmit={handleForm} */>
          <div>
            <Input
              placeholder="Valor"
              type="email"
              // value={email}
              //onChange={(event) => setEmail(event.target.value)}
              required
            ></Input>
          </div>

          <div>
            <Input
              placeholder="Descrição"
              type="password"
              //value={senha}
              //onChange={(event) => setSenha(event.target.value)}
              required
            ></Input>
          </div>

          <Button type="submit">Salvar entrada</Button>
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

export const Topo = styled.div`
  margin-bottom: 20px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 93%;
  width: 93%;
`;
