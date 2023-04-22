import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import axios from "axios";

export default function SignInPage() {

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(event) {
    event.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/`, { mail, password });
      console.log(res.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
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
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  );
};

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
