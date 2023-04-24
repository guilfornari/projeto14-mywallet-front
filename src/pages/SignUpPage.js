import { Link } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  async function signUp(event) {
    event.preventDefault();
    if (password !== confirmPw) return alert("Confirmação não confere com a senha utilizada");
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, { name, mail, password });
      alert(res.data);

    } catch (error) {
      alert(error.response.data);
    };

  };

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)} />
        <input placeholder="E-mail"
          type="email"
          required
          value={mail}
          onChange={e => setMail(e.target.value)} />
        <input placeholder="Senha"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <input placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPw}
          onChange={e => setConfirmPw(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  );
};

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: white;
        text-decoration: none;
        padding-top: 30px;
    }
`;
