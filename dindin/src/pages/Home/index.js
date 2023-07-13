import './styles.css'
import MainHead from "../../Components/MainHead/MainHead";
import Resumo from '../../Components/Resumo';
import Tabela from '../../Components/Tabela';
import ModalRegistro from '../../Components/ModalRegistro';
import ModalEditarPerfil from '../../Components/ModalEditarPerfil';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/localStorage';


export default function Home() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [transacoes, setTransacoes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [modalRegistro, setModalRegistro] = useState(false);
  const [modalEditarPerfil, setModalEditarPerfil] = useState(false)

  async function getUser() {
    const token = getItem('token');
    try {
      const response = await api.get('/usuario', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNome(response.data.nome);
      setEmail(response.data.email);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTransacoes() {
    const token = getItem('token');
    try {
      const response = await api.get('/transacao', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTransacoes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllCategories() {
    try {
      const token = getItem('token');
      const response = await api.get('/categoria', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAllCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getTransacoes();
    getAllCategories();
  }, []);

  return (
    <div className="container-home">
      <MainHead name={nome} setModalEditarPerfil={setModalEditarPerfil} />

      <ModalEditarPerfil
        nome={nome}
        setNome={setNome}
        email={email}
        modalEditarPerfil={modalEditarPerfil}
        setModalEditarPerfil={setModalEditarPerfil} />

      <div className='main-home'>
        <Tabela
          transacoes={transacoes}
          setTransacoes={setTransacoes}
          allCategories={allCategories}
        />

        <ModalRegistro
          modalRegistro={modalRegistro}
          setModalRegistro={setModalRegistro}
          transacoes={transacoes}
          setTransacoes={setTransacoes}
          allCategories={allCategories}
        />

        <Resumo
          setModalRegistro={setModalRegistro}
          transacoes={transacoes}
        />
      </div>
    </div>
  )
}