import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContexts";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${user.token}` } }

  const opType = useParams();
  if (opType.tipo === "saida") return opType.tipo = "saída";

  async function registerOps(event) {
    event.preventDefault();

    try {
      const res = await axios.post(`
      ${process.env.REACT_APP_API_URL}/nova-transacao/${opType.tipo}`,
        { amount: Number(amount), description }, config);
      alert(res.data);
      navigate("/home");


    } catch (error) {
      alert(error.response.data);
    };

  };

  return (
    <TransactionsContainer>
      <h1>Nova {opType.tipo}</h1>
      <form onSubmit={registerOps}>
        <input placeholder="Valor"
          type="text"
          required
          value={amount}
          onChange={e => setAmount(e.target.value)} />
        <input placeholder="Descrição"
          type="text"
          required
          value={description}
          onChange={e => setDescription(e.target.value)} />
        <button type="submit">Salvar {opType.tipo}</button>
      </form>
    </TransactionsContainer>
  );
};

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
