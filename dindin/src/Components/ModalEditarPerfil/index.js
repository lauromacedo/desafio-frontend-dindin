import './styles.css';
import { useState } from 'react';
import closeBtn from '../../assets/closeBtn.svg';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';


export default function ModalEditarPerfil({ modalEditarPerfil, setModalEditarPerfil, setNome, nome, email }) {
  let [form, setForm] = useState({
    nome: nome,
    email: email,
    senha: '',
    confirmacaoSenha: ''
  });
  const [erro, setErro] = useState('');

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = getItem('token');

    if (!form.nome || !form.email || !form.senha || !form.confirmacaoSenha) {
      return setErro('Todos os campos devem ser preenchidos!');
    }
    if (form.senha !== form.confirmacaoSenha) {
      return setErro('As senhas não são compativeis!');
    }

    try {
      await api.put('/usuario', {
        nome: form.nome,
        email: form.email,
        senha: form.senha
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNome(form.nome)
      setForm({
        nome: form.nome,
        email: form.email,
        senha: '',
        confirmacaoSenha: ''
      });

      setModalEditarPerfil(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        modalEditarPerfil &&
        <div>
          <div className='container-modal'>
            <div className='modal-body'>
              <div className='modal-title'>
                <h1>Editar Perfil</h1>
                <img src={closeBtn} alt='Fechar' onClick={() => setModalEditarPerfil(false)} />
              </div>

              <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={(e) => handleForm(e)}
                  onFocus={() => setErro('')}
                />

                <label htmlFor="email">E-mail</label>
                <input
                  type='text'
                  name='email'
                  value={form.email}
                  onChange={(e) => handleForm(e)}
                  onFocus={() => setErro('')}
                />

                <label htmlFor="password">Nova Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={(e) => handleForm(e)}
                  onFocus={() => setErro('')}
                />

                <label htmlFor="confirmacaoSenha">Confirmação de senha</label>
                <input
                  type="password"
                  name="confirmacaoSenha"
                  value={form.confirmacaoSenha}
                  onChange={(e) => handleForm(e)}
                  onFocus={() => setErro('')}
                />
                <div className="error">
                  {erro &&
                    <strong>{erro}</strong>}
                </div>
                <div className='form-btn'>
                  <button>Confirmar</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      }

    </>
  )
}