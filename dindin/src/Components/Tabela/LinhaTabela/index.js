import './styles.css';
import iconEditar from '../../../assets/iconEditar.svg';
import iconLixo from '../../../assets/iconLixo.svg';
import ModalEditar from '../../ModalEditar';
import ModalDeletar from '../../ModalDeletetar';
import { useEffect, useState } from 'react';

export default function LinhaTabela({ id, data, dia_da_semana, descricao, categoria_nome, valor, tipo, transacoes, setTransacoes, allCategories }) {
    const dataFormatada = data.slice(0, 10).split('-').reverse().join('/');
    const diaFormatado = new Date(data).getDay();

    const diasDaSemana = [
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
        'Domingo',
    ];

    const [transacaoAtual, setTransacaoAtual] = useState({});
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);

    async function getTransacaoAtual(id) {
        const transacao = await transacoes.find(transacao => transacao.id === id);
        setTransacaoAtual(transacao);
    }

    useEffect(() => {
        getTransacaoAtual(id);
    }, [transacoes]);

    return (
        <>
            <div className='linha-tabela' id={id}>
                <div> {data ? dataFormatada : '-'} </div>
                <div> {dia_da_semana ? diasDaSemana[diaFormatado] : '-'} </div>
                <div> {descricao ? descricao : '-'} </div>
                <div> {categoria_nome ? categoria_nome : '-'} </div>
                <div className={tipo === 'entrada' ? 'tipoEntrada' : 'tipoSaida'} > {valor ? valor : '-'} </div>
                <div className='linha-tabela-buttons'>
                    <img src={iconEditar} alt='editar' onClick={() => setModalEditar(true)} />
                    <img src={iconLixo} alt='editar' onClick={() => setModalDeletar(true)} />
                </div>
                {modalDeletar &&
                    <ModalDeletar
                        modalDeletar={modalDeletar}
                        setModalDeletar={setModalDeletar}
                        transacoes={transacoes}
                        setTransacoes={setTransacoes}
                        transacaoAtual={transacaoAtual} />}
            </div>

            {modalEditar &&
                <ModalEditar
                    modalEditar={modalEditar}
                    setModalEditar={setModalEditar}
                    transacoes={transacoes}
                    setTransacoes={setTransacoes}
                    transacaoAtual={transacaoAtual}
                    allCategories={allCategories}
                />}
        </>
    );
}
