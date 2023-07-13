import "./styles.css";
import LoginHead from "../../Components/LoginHead/LoginHead";
import PurpleButton from "../../Components/PurpleButton/PurpleButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setItem, getItem } from "../../utils/localStorage";
import api from '../../services/api'

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getItem('token');
    if (token) {
      navigate('/home');
    }
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!form.email || !form.senha) {
        return setError('É necessário preencher todos os campos!');
      }

      const response = await api.post('/login', {
        email: form.email,
        senha: form.senha
      });

      const { token, usuario } = response.data;
      setItem('token', token);
      setItem('id', usuario.id);
      navigate('/home');
    } catch (error) {
      return setError('O e-mail ou senha está incorreto!')
    }
  }

  return (
    <div className="main">
      <LoginHead />
      <div className="container-signin">
        <div className="container-text">
          <div className="signin-text">
            <h1>Controle suas <strong>finanças</strong>, sem planilha chata.</h1>

            <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
            <div className="signup-btn">
              <button onClick={() => navigate('/sign-up')}>Cadastre-se</button>
            </div>
          </div>

        </div>
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>E-mail</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setError('')}
            />


            <label>Password</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              onFocus={() => setError('')}
            />

            <div className="error">
              {error &&
                <strong>{error}</strong>}
            </div>

            <PurpleButton name='Entrar' />
          </form>
        </div>
      </div >
    </div >

  )
}
