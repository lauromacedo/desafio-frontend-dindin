import './styles.css';
import closeBtn from '../../assets/closeBtn.svg';
import api from "../../services/api";
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/localStorage';

export default function ModalEditar({ modalEditar, setModalEditar, transacoes, setTransacoes, transacaoAtual, allCategories }) {

  const [categories, setCategories] = useState(allCategories);
  const [entrada, setEntrada] = useState('');
  const [saida, setSaida] = useState('');
  const [form, setForm] = useState({
    valor: transacaoAtual.valor,
    categoria: transacaoAtual.categoria_nome,
    data: transacaoAtual.data,
    descricao: transacaoAtual.descricao,
    categoria_id: transacaoAtual.categoria_id
  });
  const [tipoTransacao, setTipoTransacao] = useState(transacaoAtual.tipo);


  function handleButton(valor) {
    if (valor === 'entrada') {
      setEntrada('entrada');
      setTipoTransacao('entrada');
      return;
    }

    if (valor === 'saida') {
      setSaida('saida');
      setTipoTransacao('saida');
      return;
    }

    if (valor.target.name === 'entrada') {
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

    console.log(form);

    if (!form.valor || !form.categoria || !form.data || !form.descricao) {
      return alert('Preencha todos os campos!');
    }

    try {
      const token = getItem('token');
      const idTransacao = transacaoAtual.id;

      await api.put(`/transacao/${idTransacao}`, {
        descricao: form.descricao,
        valor: form.valor,
        data: form.data,
        categoria_id: form.categoria_id,
        tipo: tipoTransacao
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const transacaoEditada = {
        id: transacaoAtual.id,
        tipo: tipoTransacao,
        valor: form.valor,
        categoria_nome: form.categoria,
        categoria_id: form.categoria_id,
        data: form.data,
        descricao: form.descricao,
      }

      const transacaoOriginal = transacoes.find(transacao => transacao.id === transacaoEditada.id);

      const localTransacoes = [...transacoes];
      localTransacoes.splice(localTransacoes.indexOf(transacaoOriginal), 1, transacaoEditada);

      setTransacoes(localTransacoes);

      setModalEditar(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleButton(tipoTransacao);
  }, [transacoes]);

  return (
    <>
      {modalEditar &&
        <div className='container-modal'>
          <div className='modal-body'>
            <div className='modal-title'>
              <h1>Editar Registro</h1>
              <img src={closeBtn} alt='Fechar' onClick={() => setModalEditar(false)} />
            </div>

            <div className='modal-btns'>
              <button className={`btn-modal ${entrada}`}
                name='entrada'
                onClick={(e) => handleButton(e)}
              >
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
                value={form.data.slice(0, 10)}
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