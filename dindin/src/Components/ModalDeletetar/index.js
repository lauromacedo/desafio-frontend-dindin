import './styles.css';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import modalSeta from '../../assets/seta-modal-delete.svg';

export default function ModalDeletar({ modalDeletar, setModalDeletar, transacoes, setTransacoes, transacaoAtual }) {

    async function deleteTransacao(transacao) {
        try {
            const token = getItem('token');
            await api.delete(`/transacao/${transacao.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const localTransacoes = [...transacoes];

            localTransacoes.splice(localTransacoes.indexOf(transacao), 1);

            setTransacoes(localTransacoes);
            setModalDeletar(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {modalDeletar &&
                <div className='modal-deletar'>
                    <img src={modalSeta} className='modal-img-seta'
                        alt='seta' />
                    <span>Apagar item?</span>
                    <div className='modal-deletar-buttons'>
                        <button className='btn-modal-deletar btn-modal-deletar-sim' onClick={() => deleteTransacao(transacaoAtual)}>Sim</button>
                        <button className='btn-modal-deletar btn-modal-deletar-nao' onClick={() => setModalDeletar(false)}>Não</button>
                    </div>
                </div>}
        </>
    )
}