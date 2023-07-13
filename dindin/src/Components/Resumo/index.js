import './styles.css';
import api from "../../services/api";
import { getItem } from "../../utils/localStorage";
import { useState } from 'react';

export default function Resumo({ setModalRegistro, transacoes }) {

    let [totalEntradas, setTotalEntradas] = useState(0);
    let [totalSaidas, setTotalSaidas] = useState(0);
    let [totalSaldo, setTotalSaldo] = useState(0)

    async function getExtrato() {
        const token = getItem("token");
        try {
            const response = await api.get("/transacao/extrato", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTotalEntradas(response.data.entrada);
            setTotalSaidas(response.data.saida);
            setTotalSaldo(totalEntradas - totalSaidas)
        } catch (error) {
            console.log(error);
        }
    }

    getExtrato();

    return (
        <div className='resumo-container'>
            <div className='resumo-box'>
                <h1>Resumo</h1>
                <div className='numbers-resumo'>
                    <div className='resumo-entrada'>
                        <h3>Entradas</h3>
                        <strong>R${totalEntradas}</strong>
                    </div>
                    <div className='resumo-saida'>
                        <h3>Saídas</h3>
                        <strong>R${totalSaidas}</strong>
                    </div>
                    <div className='resumo-saldo'>
                        <h2>Saldo</h2>
                        <strong>R${totalSaldo}</strong>
                    </div>

                </div>
            </div>
            <button onClick={() => setModalRegistro(true)}>Adicionar Registro</button>
        </div>
    )
}