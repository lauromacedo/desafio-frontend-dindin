import "./styles.css";
import LoginHead from "../../Components/LoginHead/LoginHead";
import PurpleButton from "../../Components/PurpleButton/PurpleButton";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getItem } from "../../utils/localStorage";
import api from "../../services/api";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirm_senha: ''
  });
  const [error, setError] = useState('');


  useEffect(() => {
    const token = getItem('token');
    if (token) {
      navigate('/home')
    }
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!form.nome || !form.email || !form.senha || !form.confirm_senha) {
        return setError('É necessário preencher todos os campos!');
      }

      if (form.senha !== form.confirm_senha) {
        return setError('As senhas deverão ser iguais!');
      }

      const response = await api.post('/usuario', {
        ...form
      });

      if (response.status === 201) {
        alert('Usuário cadastrado com sucesso');
        navigate('/sign-in')
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main-signup">
      <LoginHead />
      <div className="signup-principal">
        <div className="form-signup">
          <h2>Cadastre-se</h2>
          <form onSubmit={handleSubmit}>
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              onFocus={() => setError('')}
            />
            <label>E-mail</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setError('')}
            />
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              onFocus={() => setError('')}
            />
            <label>Confirmação de senha</label>
            <input
              type="password"
              name="confirm_senha"
              className="confirm-senha"
              value={form.confirm_senha}
              onChange={handleChange}
              onFocus={() => setError('')}
            />

            <div className="error">
              {error &&
                <strong>{error}</strong>}
            </div>

            <div className="button-signup">
              <PurpleButton name='Cadastrar' />
            </div>
          </form>
          <div className="redirect-link">
            <Link to='/'>Já tem cadastro? Clique aqui!</Link>
          </div>
        </div>
      </div>
    </div >
  )
}
