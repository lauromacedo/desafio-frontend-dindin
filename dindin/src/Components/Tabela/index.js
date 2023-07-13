import './styles.css';
import HeaderTabela from './HeaderTabela';
import LinhaTabela from './LinhaTabela';

export default function Tabela({ transacoes, setTransacoes, allCategories }) {
  return (
    <div className='tabela'>
      <HeaderTabela />
      {
        transacoes.map((transacao) => (
          <LinhaTabela
            transacoes={transacoes}
            setTransacoes={setTransacoes}
            allCategories={allCategories}

            key={transacao.id}
            id={transacao.id}
            data={transacao.data}
            dia_da_semana={transacao.data}
            descricao={transacao.descricao}
            categoria_nome={transacao.categoria_nome}
            valor={transacao.valor}
            tipo={transacao.tipo}
          />
        ))
      }
    </div>
  )
}