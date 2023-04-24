import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OperationCard from "../components/OperationCard";



export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  const [operations, setOperations] = useState([]);
  const [balance, setBalance] = useState(0);
  const [whatColor, setWhatColor] = useState("");

  useEffect(() => {
    if (!user.token) {
      alert("Não tens permissão para continuar, faça o login.");
      navigate("/");
    } else {
      getOperationsList();
    };
  });

  async function getOperationsList() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/home`, config);
      setOperations(res.data);
      sumBalance(res.data);

    } catch (error) {
      alert(error.response.data);
    }
  };

  function newOps(opType) {
    navigate(`/nova-transacao/${opType}`);
  };

  function sumBalance(opsList) {
    const creditOps = opsList.filter(op => op.type === "entrada");
    const debitOps = opsList.filter(op => op.type === "saída");
    const creditArr = creditOps.map(op => op.amount);
    const debitArr = debitOps.map(op => op.amount);
    const positiveSum = creditArr.reduce((a, b) => a + b, 0);
    const negativeSum = debitArr.reduce((a, b) => a + b, 0);
    const sumUp = positiveSum - negativeSum;
    if (sumUp < 0) {
      setBalance(sumUp * (-1));
      setWhatColor("negativo");
    } else {
      setBalance(sumUp);
      setWhatColor("positivo");
    }
  }

  function logOut() {
    localStorage.removeItem("user");
    setUser({});
    navigate("/");
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <button onClick={logOut}>
          <BiExit />
        </button>
      </Header>

      <TransactionsContainer>
        {false ? "Nada" :
          <>
            <ul>
              {operations.map((ops) => (<OperationCard
                key={ops._id}
                amount={ops.amount}
                description={ops.description}
                type={ops.type}
                date={ops.date} />))}
            </ul>
            <article>
              <strong>Saldo</strong>
              <Value color={whatColor}>{balance.toFixed(2)}</Value>
            </article>
          </>
        }
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={() => newOps("entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => newOps("saída")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
  button {
    width: 50px;
    height: 50px;
    font-size: 30px;
    background-color: #8c11be;
  }
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;