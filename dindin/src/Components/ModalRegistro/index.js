import './styles.css';
import closeBtn from '../../assets/closeBtn.svg';
import api from "../../services/api";
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/localStorage';

export default function ModalRegistro({ modalRegistro, setModalRegistro, transacoes, setTransacoes, allCategories }) {

  const [categories, setCategories] = useState(allCategories);
  const [entrada, setEntrada] = useState('');
  const [saida, setSaida] = useState('');
  const [tipoTransacao, setTipoTransacao] = useState('');
  const [form, setForm] = useState({
    valor: '',
    categoria: '',
    data: '',
    descricao: '',
    categoria_id: null
  });


  async function getAllCategories() {
    try {
      const token = getItem('token');
      const response = await api.get('/categoria', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleButton(e) {
    if (e.target.name === 'entrada') {
      setEntrada('entrada');
      setTipoTransacao('entrada');
      setSaida('');
      return;
    }
    setSaida('saida');
    setTipoTransacao('saida');
    setEntrada('');
  }

  function handleForm(e) {
    if (e.target.name === 'categoria') {
      const selectedCategorie = handleSelect(e);
      const formAtualizado = { ...form };

      formAtualizado.categoria = selectedCategorie.descricao;
      formAtualizado.categoria_id = selectedCategorie.id;
      setForm(formAtualizado);
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSelect(e) {
    const localCategories = [...categories];

    const selectedCategorie = localCategories.find(option => option.descricao === e.target.value);

    return selectedCategorie;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.valor || !form.categoria || !form.data || !form.descricao) {
      return alert('Preencha todos os campos!');
    }

    try {
      const token = getItem('token');
      const response = await api.post('/transacao', {
        tipo: tipoTransacao,
        descricao: form.descricao,
        valor: form.valor,
        data: form.data,
        categoria_id: form.categoria_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const localtransacoes = [...transacoes];

      localtransacoes.push({
        id: response.data.id,
        tipo: response.data.tipo,
        valor: response.data.valor,
        categoria_nome: response.data.categoria_nome,
        categoria_id: response.data.categoria_id,
        data: response.data.data,
        descricao: response.data.descricao,
      });

      setTransacoes(localtransacoes);
      setForm({});
      setModalRegistro(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setSaida('saida');
    setEntrada('');
    setTipoTransacao('saida');
    getAllCategories();
  }, [modalRegistro]);

  return (
    <>
      {modalRegistro &&
        <div className='container-modal'>
          <div className='modal-body'>
            <div className='modal-title'>
              <h1>Adicionar Registro</h1>
              <img src={closeBtn} alt='Fechar' onClick={() => setModalRegistro(false)} />
            </div>

            <div className='modal-btns'>
              <button className={`btn-modal ${entrada}`}
                name='entrada'
                onClick={(e) => handleButton(e)}>
                Entrada
              </button>

              <button
                className={`btn-modal ${saida}`}
                name='saida'
                onClick={(e) => handleButton(e)}
              >Saída
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="valor">Valor</label>
              <input
                type="text"
                name="valor"
                value={form.valor}
                onChange={(e) => handleForm(e)}
              />

              <label htmlFor="categoria">Categoria</label>
              <select
                name='categoria'
                value={form.categoria}
                onChange={(e) => handleForm(e)}>
                <option></option>
                {categories.map(category => (
                  <option key={category.id}
                    value={category.descricao}
                  >{category.descricao}</option>)
                )}
              </select>

              <label htmlFor="data">Data</label>
              <input
                type="date"
                name="data"
                value={form.data}
                onChange={(e) => handleForm(e)}
              />

              <label htmlFor="descricao">Descrição</label>
              <input
                type="text"
                name="descricao"
                value={form.descricao}
                onChange={(e) => handleForm(e)}
              />

              <div className='form-btn'>
                <button>Confirmar</button>
              </div>
            </form>

          </div>
        </div>}
    </>
  )
}